import { useEffect, useState } from 'react';
import { UserItemsApiClient } from '../api/UserItemsApiClient';
import { IUserItem, isUserItemParent } from '../models';
import useFetch from './useFetch';

interface IUseUserItemReturn {
  userItem: IUserItem;
  isLoading: boolean;
  error: Error;
  createChild: <TChild extends IUserItem>(childItem: TChild) => Promise<TChild>;
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

  async function createChild<TChild extends IUserItem>(childItem: TChild): Promise<TChild> {
    if (isUserItemParent(userItem)) {
      const createdChildItem = await UserItemsApiClient.createUserItem(childItem);
      const updatedUserItem = await UserItemsApiClient.updateUserItem<typeof userItem>(userItemId, {
        childUserItemIds: userItem.childUserItemIds.concat(createdChildItem.id),
      });

      setUserItem(updatedUserItem);

      return createdChildItem;
    }

    return null;
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
    createChild,
    removeChild,
  };
}

export default useUserItem;
