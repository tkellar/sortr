import { useState, useEffect } from 'react';

function useFetch(input, init) {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

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
