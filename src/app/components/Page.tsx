import { faPlusCircle, faUpload, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react';
import useViewportContext from '../context/ViewportContext';
import useContextMenu from '../hooks/useContextMenu';
import { ContextMenuItem, ContextMenuViewModel, PageViewModel } from '../models';
import userItemSubject, { UserItemState } from '../subjects/UserItemSubject';
import UserItemFactory from './UserItemFactory';

function Page({ pageUserItemId }: { pageUserItemId: number }): JSX.Element {
  const [userItemState, setUserItemState] = useState<UserItemState>(null);

  useEffect(() => {
    userItemSubject.subscribe(pageUserItemId, setUserItemState);

    return () => userItemSubject.unsubscribe(pageUserItemId, setUserItemState);
  }, [pageUserItemId]);

  const menuItems: ContextMenuItem[] = [
    { displayText: 'New Board', iconLeft: faPlusCircle },
    { displayText: 'Upload File', iconLeft: faUpload },
    {
      displayText: 'Folder',
      iconRight: faAngleRight,
      children: [
        { displayText: 'New Folder', iconLeft: faPlusCircle },
        { displayText: 'Upload Folder', iconLeft: faUpload }
      ]
    },
    { displayText: 'Customize...' }
  ];

  const viewportRef = useViewportContext();
  useContextMenu(viewportRef, new ContextMenuViewModel(menuItems));

  return (
    <>
      {(userItemState?.userItem as PageViewModel)?.childUserItemIds?.map((childId) => (
        <UserItemFactory key={childId} userItemId={childId} parentUserItemId={0} />
      ))}
    </>
  );
}

export default Page;
