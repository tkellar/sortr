import { IPageItem } from './IPageItem';
import { IParentPageItem } from './IParentPageItem';
import { PageItemType } from './PageItemType';

export class PageViewModel implements IPageItem, IParentPageItem {
  id: number;
  name: string;
  pageItemType: PageItemType;
  childPageItemIds: number[];
}
