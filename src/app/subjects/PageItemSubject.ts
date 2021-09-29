import { PageItemsApiClient } from '../api/PageItemsApiClient';
import { isParentPageItem, IPageItem } from '../models';

export class PageItemState {
  isLoading = true;
  pageItem: IPageItem = null;
  error: Error = null;
}

export type PageItemObserver = (pageItem: PageItemState) => void;

class PageItemSubject {
  private observers: Map<number, PageItemObserver[]> = new Map();
  private pageItemStates: Map<number, PageItemState> = new Map();

  public subscribe(pageItemId: number, observer: PageItemObserver) {
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

  public unsubscribe(pageItemId: number, observer: PageItemObserver) {
    this.observers.set(
      pageItemId,
      this.observers.get(pageItemId).filter((obs) => obs !== observer),
    );
  }

  public async createChild<TChild extends IPageItem>(
    parentPageItemId: number,
    childItem: TChild,
  ): Promise<TChild> {
    const parentPageItem = this.pageItemStates.get(parentPageItemId).pageItem;
    if (isParentPageItem(parentPageItem)) {
      // Create the child item
      const createdChildItem = await PageItemsApiClient.createPageItem<TChild>(childItem);
      const { id: childItemId } = createdChildItem;
      this.pageItemStates.set(childItemId, {
        isLoading: false,
        error: null,
        pageItem: createdChildItem,
      });

      // Update the parent item
      const updatedParentItem = await PageItemsApiClient.updatePageItem<typeof parentPageItem>(
        parentPageItemId,
        {
          childPageItemIds: parentPageItem.childPageItemIds.concat(createdChildItem.id),
        },
      );

      this.updateAndNotify({
        isLoading: false,
        error: null,
        pageItem: updatedParentItem,
      });

      return createdChildItem;
    }

    return null;
  }

  public async deleteChild(parentPageItemId: number, childPageItemId: number): Promise<void> {
    const parentPageItem = this.pageItemStates.get(parentPageItemId).pageItem;
    if (isParentPageItem(parentPageItem)) {
      const updatedParentItem = await PageItemsApiClient.updatePageItem<typeof parentPageItem>(
        parentPageItemId,
        {
          childPageItemIds: parentPageItem.childPageItemIds.filter(
            (childId) => childId !== childPageItemId,
          ),
        },
      );
      this.updateAndNotify({
        isLoading: false,
        error: null,
        pageItem: updatedParentItem,
      });

      await PageItemsApiClient.deletePageItem(childPageItemId);
      this.observers.delete(childPageItemId);
      this.pageItemStates.delete(childPageItemId);
    }
  }

  private updateAndNotify(pageItemstate: PageItemState) {
    const { id: pageItemId } = pageItemstate.pageItem;
    this.pageItemStates.set(pageItemId, pageItemstate);

    for (const observer of this.observers.get(pageItemId)) {
      observer(pageItemstate);
    }
  }

  private getPageItem(pageItemId: number): PageItemState {
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
