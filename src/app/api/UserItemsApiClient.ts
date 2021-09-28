import config from '../../config.json';
import { IUserItem } from '../models';
import { BaseApiClient } from './BaseApiClient';

export class UserItemsApiClient extends BaseApiClient {
  static get base(): string {
    return `${config.API_HOST}/userItems`;
  }

  public static getUserItem(userItemId: number): Promise<IUserItem> {
    return this.get<IUserItem>(`${this.base}/${userItemId}`);
  }

  public static createUserItem<TUserItem extends IUserItem>(
    userItem: TUserItem,
  ): Promise<TUserItem> {
    return this.post<TUserItem>(this.base, userItem);
  }

  public static updateUserItem<TUserItem extends IUserItem>(
    userItemId: number,
    updates: Partial<TUserItem>,
  ): Promise<TUserItem> {
    return this.patch<TUserItem>(`${this.base}/${userItemId}`, updates);
  }

  public static deleteUserItem(userItemId: number): Promise<unknown> {
    return this.delete(`${this.base}/${userItemId}`);
  }
}
