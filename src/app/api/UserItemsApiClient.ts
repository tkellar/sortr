import config from '../../config.json';
import { IUserItem } from '../models';
import { BaseApiClient } from './BaseApiClient';

export class UserItemsApiClient extends BaseApiClient {
  static get base(): string {
    return `${config.API_HOST}/userItems`;
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
}
