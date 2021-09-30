import config from '../../config.json';
import { IPageItem } from '../models';
import { BaseApiClient } from './BaseApiClient';

export class PageItemsApiClient extends BaseApiClient {
  static get base(): string {
    return `${config.API_HOST}/userItems`;
  }

  public static getPageItem(pageItemId: number): Promise<IPageItem> {
    return this.get<IPageItem>(`${this.base}/${pageItemId}`);
  }

  public static createPageItem<TPageItem extends IPageItem>(
    pageItem: TPageItem,
  ): Promise<TPageItem> {
    return this.post<TPageItem>(this.base, pageItem);
  }

  public static updatePageItem<TPageItem extends IPageItem>(
    pageItemId: number,
    updates: Partial<TPageItem>,
  ): Promise<TPageItem> {
    return this.patch<TPageItem>(`${this.base}/${pageItemId}`, updates);
  }

  public static deletePageItem(pageItemId: number): Promise<unknown> {
    return this.delete(`${this.base}/${pageItemId}`);
  }
}
