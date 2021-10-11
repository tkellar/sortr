import { IHeightWidth, ICoordinates } from '.';
import { PageItemBase } from './PageItemBase';
import { PageItemType } from './PageItemType';

export class BoardViewModel extends PageItemBase implements IHeightWidth, ICoordinates {
  _id: string;
  name: string;
  pageItemType: PageItemType;
  height: number;
  width: number;
  x: number;
  y: number;
}
