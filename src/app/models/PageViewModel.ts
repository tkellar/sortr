import { IUserItem } from './IUserItem';
import { IUserItemParent } from './IUserItemParent';
import { UserItemType } from './UserItemType';

export class PageViewModel implements IUserItem, IUserItemParent {
  id: number;
  name: string;
  userItemType: UserItemType;
  childUserItemIds: number[];
}
