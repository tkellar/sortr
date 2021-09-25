import { useEffect, useState } from 'react';
import { PageViewModel } from '../models';
import useFetch from './useFetch';

interface IUsePageReturn {
  page: PageViewModel;
  isLoading: boolean;
  error: Error;
  addChild: (childId: number) => void;
  removeChild: (childId: number) => void;
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

  function addChild(childId: number) {
    fetch(`http://localhost:8000/pages/${pageId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        childUserItemIds: [...page.childUserItemIds.concat(childId)],
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }

        throw new Error();
      })
      .then((updated) => {
        setPage((prevState) => {
          const { childUserItemIds } = updated;
          return {
            ...prevState,
            childUserItemIds,
          };
        });
      });
  }

  function removeChild(childId: number) {
    setPage((prevState) => {
      const childrenIds = prevState.childUserItemIds;
      return {
        ...prevState,
        childUserItemIds: childrenIds.filter((id) => id !== childId),
      };
    });
  }

  return {
    page,
    isLoading,
    error,
    addChild,
    removeChild,
  };
}

export default usePage;
