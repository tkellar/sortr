import { UserItemsApiClient } from '../api/UserItemsApiClient';
import { isUserItemParent, IUserItem } from '../models';

export class UserItemState {
  isLoading = true;
  userItem: IUserItem = null;
  error: Error = null;
}

export type UserItemObserver = (userItem: UserItemState) => void;

class UserItemSubject {
  private observers: Map<number, UserItemObserver[]> = new Map();
  private userItems: Map<number, UserItemState> = new Map();

  public subscribe(userItemId: number, observer: UserItemObserver) {
    if (this.observers.has(userItemId)) {
      this.observers.get(userItemId).push(observer);
    } else {
      this.observers.set(userItemId, [observer]);
    }

    if (this.userItems.has(userItemId)) {
      observer(this.userItems.get(userItemId));
    } else {
      observer(this.getUserItem(userItemId));
    }
  }

  public unsubscribe(userItemId: number, observer: UserItemObserver) {
    console.log('Unsubscribe from', userItemId);
    this.observers.set(
      userItemId,
      this.observers.get(userItemId).filter((obs) => obs !== observer),
    );
  }

  public async createChild<TChild extends IUserItem>(
    parentUserItemId: number,
    childItem: TChild,
  ): Promise<TChild> {
    const parentUserItem = this.userItems.get(parentUserItemId).userItem;
    if (isUserItemParent(parentUserItem)) {
      const createdChildItem = await UserItemsApiClient.createUserItem<TChild>(childItem);
      const updatedParentItem = await UserItemsApiClient.updateUserItem<typeof parentUserItem>(
        parentUserItemId,
        {
          childUserItemIds: parentUserItem.childUserItemIds.concat(createdChildItem.id),
        },
      );

      this.userItems.set(parentUserItemId, {
        isLoading: false,
        error: null,
        userItem: updatedParentItem,
      });

      this.notify(parentUserItemId);

      return createdChildItem;
    }

    return null;
  }

  public async deleteChild(parentUserItemId: number, childUserItemId: number): Promise<void> {
    const parentUserItem = this.userItems.get(parentUserItemId).userItem;
    if (isUserItemParent(parentUserItem)) {
      const updatedParentItem = await UserItemsApiClient.updateUserItem<typeof parentUserItem>(
        parentUserItemId,
        {
          childUserItemIds: parentUserItem.childUserItemIds.filter(
            (childId) => childId !== childUserItemId,
          ),
        },
      );
      await UserItemsApiClient.deleteUserItem(childUserItemId);

      this.userItems.set(parentUserItemId, {
        isLoading: false,
        error: null,
        userItem: updatedParentItem,
      });

      this.notify(parentUserItemId);
    }
  }

  private notify(userItemId: number): void {
    console.log('Notify subscibers of', userItemId);
    for (const observer of this.observers.get(userItemId)) {
      observer(this.userItems.get(userItemId));
    }
  }

  private getUserItem(userItemId: number): UserItemState {
    const initialState = new UserItemState();
    this.userItems.set(userItemId, initialState);

    UserItemsApiClient.getUserItem(userItemId).then((userItem: IUserItem) => {
      this.userItems.set(userItemId, {
        userItem,
        error: null,
        isLoading: false,
      });

      this.notify(userItemId);
    });

    return initialState;
  }
}

const userItemSubject = new UserItemSubject();

export default userItemSubject;
