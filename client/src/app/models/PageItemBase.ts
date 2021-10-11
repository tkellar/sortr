import { IPageItem, PageItemType } from '.';

export class PageItemBase implements IPageItem {
  _id: string;
  name: string;
  pageItemType: PageItemType;
  parentPageItemId: string;

  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }
}
