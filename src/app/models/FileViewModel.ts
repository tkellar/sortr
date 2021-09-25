import { UserItemType } from './UserItemType';
import { IUserItem } from './IUserItem';
import { ICoordinates } from './ICoordinates';

export class FileViewModel implements IUserItem, ICoordinates {
  id?: number;
  userItemType: UserItemType;
  name: string;
  extension: string;
  x: number;
  y: number;
}
