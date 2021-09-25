import { useEffect, useState } from 'react';
import { IUserItem, isUserItemParent } from '../models';
import useFetch from './useFetch';

interface IUseUserItemReturn {
  userItem: IUserItem;
  isLoading: boolean;
  error: Error;
  addChild: (id: number) => void;
  removeChild: (id: number) => void;
}

function useUserItem(userItemId: number): IUseUserItemReturn {
  const { isLoading, data, error } = useFetch<IUserItem, Error>(
    `http://localhost:8000/userItems/${userItemId}`,
    {
      method: 'GET',
    },
  );
  const [userItem, setUserItem] = useState<IUserItem>(null);

  function addChild(childId: number): void {
    setUserItem((prevState) => {
      if (isUserItemParent(prevState)) {
        const childrenIds = prevState.childUserItemIds;
        return {
          ...prevState,
          childUserItemIds: childrenIds.concat(childId),
        };
      }

      return prevState;
    });
  }

  function removeChild(childId: number): void {
    setUserItem((prevState) => {
      if (isUserItemParent(prevState)) {
        const childrenIds = prevState.childUserItemIds;
        return {
          ...prevState,
          childUserItemIds: childrenIds.filter((id) => id !== childId),
        };
      }

      return prevState;
    });
  }

  useEffect(() => {
    setUserItem(data);
  }, [data]);

  return {
    userItem,
    isLoading,
    error,
    addChild,
    removeChild,
  };
}

export default useUserItem;
