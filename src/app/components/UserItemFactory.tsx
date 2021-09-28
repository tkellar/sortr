import React, { useEffect, useState } from 'react';
import { BoardViewModel, FileViewModel, UserItemType } from '../models';
import userItemSubject, { UserItemState } from '../subjects/UserItemSubject';
import Board from './Board';
import File from './File';

function UserItemFactory({ userItemId, parentUserItemId }: { userItemId: number, parentUserItemId: number }): JSX.Element {
  const [userItemState, setUserItemState] = useState<UserItemState>(null);
  useEffect(() => {
    userItemSubject.subscribe(userItemId, setUserItemState);

    return () => userItemSubject.unsubscribe(userItemId, setUserItemState);
  }, []);

  switch (userItemState?.userItem?.userItemType) {
    case UserItemType.Board:
      return <Board board={userItemState.userItem as BoardViewModel} parentUserItemId={parentUserItemId} />;
    case UserItemType.File:
      return <File file={userItemState.userItem as FileViewModel} />;
    default:
      return null;
  }
}

export default UserItemFactory;
