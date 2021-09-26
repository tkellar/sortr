import React from 'react';
import useUserItem from '../hooks/useUserItem';
import { BoardViewModel, FileViewModel, UserItemType } from '../models';
import Board from './Board';
import File from './File';

function UserItemFactory({ userItemId }: { userItemId: number }): JSX.Element {
  const { userItem, createChild } = useUserItem(userItemId);

  // TODO: Implement removeSelf here??? I need access to the parent for that. Context???

  switch (userItem?.userItemType) {
    case UserItemType.Board:
      return <Board board={userItem as BoardViewModel} createChild={createChild} />;
    case UserItemType.File:
      return <File file={userItem as FileViewModel} />;
    default:
      return null;
  }
}

export default UserItemFactory;
