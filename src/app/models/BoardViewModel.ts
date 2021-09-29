import { IHeightWidth, ICoordinates, IPageItem } from '.';
import { IParentPageItem } from './IParentPageItem';
import { PageItemType } from './PageItemType';

export class BoardViewModel implements IPageItem, IParentPageItem, IHeightWidth, ICoordinates {
  id?: number;
  name: string;
  pageItemType: PageItemType;
  childPageItemIds: number[];
  height: number;
  width: number;
  x: number;
  y: number;
}
