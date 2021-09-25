import { UserItemType } from './UserItemType';

export interface IUserItem {
  id?: number;
  name: string;
  userItemType: UserItemType;
}
