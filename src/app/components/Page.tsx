import { faPlusCircle, faUpload, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react';
import useBoundingContainerContext from '../context/BoundingContainerContext';
import useContextMenu from '../hooks/useContextMenu';
import { ContextMenuItem, ContextMenuConfig, PageViewModel } from '../models';
import pageItemSubject, { PageItemState } from '../subjects/PageItemSubject';
import PageItemFactory from './PageItemFactory';

function Page({ pageId }: { pageId: number }): JSX.Element {
  const [pageItemState, setPageItemState] = useState<PageItemState>(null);

  useEffect(() => {
    pageItemSubject.subscribe(pageId, setPageItemState);

    return () => pageItemSubject.unsubscribe(pageId, setPageItemState);
  }, [pageId]);

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

  const viewportRef = useBoundingContainerContext();
  useContextMenu(viewportRef, new ContextMenuConfig(menuItems));

  return (
    <>
      {(pageItemState?.pageItem as PageViewModel)?.childPageItemIds?.map((childId) => (
        <PageItemFactory key={childId} pageItemId={childId} parentPageItemId={0} />
      ))}
    </>
  );
}

export default Page;
