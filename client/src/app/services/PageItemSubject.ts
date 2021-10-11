import { PageItemsApiClient } from '../api/PageItemsApiClient';
import { IPageItem } from '../models';

export class PageItemState {
  isLoading = true;
  pageItem: IPageItem = null;
  error: Error = null;
}

export type PageItemObserver = (pageItem: PageItemState) => void;

class PageItemSubject {
  private observers: Map<string, PageItemObserver[]> = new Map();
  private pageItemStates: Map<string, PageItemState> = new Map();

  public subscribe(pageItemId: string, observer: PageItemObserver) {
    if (this.observers.has(pageItemId)) {
      this.observers.get(pageItemId).push(observer);
    } else {
      this.observers.set(pageItemId, [observer]);
    }

    if (this.pageItemStates.has(pageItemId)) {
      observer(this.pageItemStates.get(pageItemId));
    } else {
      observer(this.getPageItem(pageItemId));
    }
  }

  public unsubscribe(pageItemId: string, observer: PageItemObserver) {
    this.observers.set(
      pageItemId,
      this.observers.get(pageItemId).filter((obs) => obs !== observer),
    );
  }

  private updateAndNotify(pageItemstate: PageItemState) {
    const { id: pageItemId } = pageItemstate.pageItem;
    this.pageItemStates.set(pageItemId, pageItemstate);

    for (const observer of this.observers.get(pageItemId)) {
      observer(pageItemstate);
    }
  }

  private getPageItem(pageItemId: string): PageItemState {
    const initialState = new PageItemState();
    this.pageItemStates.set(pageItemId, initialState);

    PageItemsApiClient.getPageItem(pageItemId).then((pageItem: IPageItem) => {
      this.updateAndNotify({
        pageItem,
        error: null,
        isLoading: false,
      });
    });

    return initialState;
  }
}

const pageItemSubject = new PageItemSubject();

export default pageItemSubject;
