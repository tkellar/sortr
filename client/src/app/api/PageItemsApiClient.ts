import config from '../../config.json';
import { IPageItem } from '../models';
import { BaseApiClient } from './BaseApiClient';

export class PageItemsApiClient extends BaseApiClient {
  private static get base(): string {
    return `${config.API_HOST}/api/v1/pageItems`;
  }

  public static getPageItem(pageItemId: string): Promise<IPageItem> {
    return this.get<IPageItem>(`${this.base}/${pageItemId}`);
  }

  public static getPageItemsByParentId(parentPageItemId: string): Promise<IPageItem[]> {
    return this.get<IPageItem[]>(`${this.base}/?parentPageItemId=${parentPageItemId}`);
  }

  public static createPageItem<TPageItem extends IPageItem>(
    pageItem: TPageItem,
  ): Promise<TPageItem> {
    return this.post<TPageItem>(this.base, pageItem);
  }

  public static updatePageItem<TPageItem extends IPageItem>(
    pageItemId: number,
    updates: TPageItem,
  ): Promise<TPageItem> {
    return this.patch<TPageItem>(`${this.base}/${pageItemId}`, updates);
  }

  public static deletePageItem(pageItemId: number): Promise<unknown> {
    return this.delete(`${this.base}/${pageItemId}`);
  }
}
