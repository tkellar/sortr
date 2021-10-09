import React, { useEffect, useState } from 'react';
import { BoardViewModel, FileViewModel, PageItemType } from '../models';
import pageItemSubject, { PageItemState } from '../subjects/PageItemSubject';
import Board from './Board';
import File from './File';

function PageItemFactory({ pageItemId, parentPageItemId }: { pageItemId: number, parentPageItemId: number }): JSX.Element {
  const [pageItemState, setPageItemState] = useState<PageItemState>(null);
  useEffect(() => {
    pageItemSubject.subscribe(pageItemId, setPageItemState);

    return () => pageItemSubject.unsubscribe(pageItemId, setPageItemState);
  }, []);

  switch (pageItemState?.pageItem?.pageItemType) {
    case PageItemType.Board:
      return <Board board={pageItemState.pageItem as BoardViewModel} parentPageItemId={parentPageItemId} />;
    case PageItemType.File:
      return <File file={pageItemState.pageItem as FileViewModel} />;
    default:
      return null;
  }
}

export default PageItemFactory;
