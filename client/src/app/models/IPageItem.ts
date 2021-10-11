import { PageItemType } from './PageItemType';

export interface IPageItem {
  id: string;
  _id: string;
  name: string;
  pageItemType: PageItemType;
  parentPageItemId: string;
}
