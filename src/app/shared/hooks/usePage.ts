import { useEffect, useState } from 'react';
import { PageViewModel } from '../models';
import useFetch from './useFetch';

interface IUsePageReturn {
  page: PageViewModel;
  isLoading: boolean;
  error: Error;
}

function usePage(pageId: number): IUsePageReturn {
  const { isLoading, data, error } = useFetch<PageViewModel, Error>(
    `http://localhost:8000/pages/${pageId}`,
    {
      method: 'GET',
    },
  );
  const [page, setPage] = useState<PageViewModel>(null);

  useEffect(() => {
    setPage(data);
  }, [data]);

  return {
    page,
    isLoading,
    error,
  };
}

export default usePage;
