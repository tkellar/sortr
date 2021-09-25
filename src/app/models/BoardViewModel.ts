import { IHeightWidth, ICoordinates, IUserItem } from '.';
import { IUserItemParent } from './IUserItemParent';
import { UserItemType } from './UserItemType';

export class BoardViewModel implements IUserItem, IUserItemParent, IHeightWidth, ICoordinates {
  id?: number;
  name: string;
  userItemType: UserItemType;
  childUserItemIds: number[];
  height: number;
  width: number;
  x: number;
  y: number;
}
