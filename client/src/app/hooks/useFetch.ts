import { useState, useEffect } from 'react';

interface UseFetchReturn<TRet, TErr> {
  isLoading: boolean;
  data: TRet;
  error: TErr;
}

function useFetch<TRet, TErr>(input: RequestInfo, init: RequestInit): UseFetchReturn<TRet, TErr> {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null as TRet);
  const [error, setError] = useState(null as TErr);

  useEffect(() => {
    fetch(input, init)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(res);
      })
      .then((payload) => setData(payload))
      .catch((err) => setError(err))
      .finally(() => setIsLoading(false));
  }, []);

  return {
    isLoading,
    data,
    error,
  };
}

export default useFetch;
