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
      // Create the child item
      const createdChildItem = await UserItemsApiClient.createUserItem<TChild>(childItem);
      const { id: childItemId } = createdChildItem;
      this.userItems.set(childItemId, {
        isLoading: false,
        error: null,
        userItem: createdChildItem,
      });

      // Update the parent item
      const updatedParentItem = await UserItemsApiClient.updateUserItem<typeof parentUserItem>(
        parentUserItemId,
        {
          childUserItemIds: parentUserItem.childUserItemIds.concat(createdChildItem.id),
        },
      );

      this.updateAndNotify({
        isLoading: false,
        error: null,
        userItem: updatedParentItem,
      });

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
      this.updateAndNotify({
        isLoading: false,
        error: null,
        userItem: updatedParentItem,
      });

      await UserItemsApiClient.deleteUserItem(childUserItemId);
      this.observers.delete(childUserItemId);
      this.userItems.delete(childUserItemId);
    }
  }

  private updateAndNotify(userItemState: UserItemState) {
    const { id: userItemId } = userItemState.userItem;
    this.userItems.set(userItemId, userItemState);

    for (const observer of this.observers.get(userItemId)) {
      observer(userItemState);
    }
  }

  private getUserItem(userItemId: number): UserItemState {
    const initialState = new UserItemState();
    this.userItems.set(userItemId, initialState);

    UserItemsApiClient.getUserItem(userItemId).then((userItem: IUserItem) => {
      this.updateAndNotify({
        userItem,
        error: null,
        isLoading: false,
      });
    });

    return initialState;
  }
}

const userItemSubject = new UserItemSubject();

export default userItemSubject;
