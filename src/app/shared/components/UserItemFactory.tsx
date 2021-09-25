import React from 'react';
import useUserItem from '../hooks/useUserItems';
import { BoardViewModel, FileViewModel, UserItemType } from '../models';
import Board from './Board';
import File from './File';

function UserItemFactory({ userItemId }: { userItemId: number }): JSX.Element {
  const { userItem } = useUserItem(userItemId);

  switch (userItem?.userItemType) {
    case UserItemType.Board:
      return <Board board={userItem as BoardViewModel} />;
    case UserItemType.File:
      return <File file={userItem as FileViewModel} />;
    default:
      return null;
  }
}

export default UserItemFactory;
