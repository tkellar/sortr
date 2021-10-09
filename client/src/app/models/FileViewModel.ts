import { PageItemType } from './PageItemType';
import { IPageItem } from './IPageItem';
import { ICoordinates } from './ICoordinates';

export class FileViewModel implements IPageItem, ICoordinates {
  id?: number;
  pageItemType: PageItemType;
  name: string;
  extension: string;
  x: number;
  y: number;
}
