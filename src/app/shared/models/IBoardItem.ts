import { BoardItemType } from './BoardItemType';

export interface IBoardItem {
  id: number;
  boardItemType: BoardItemType;
  parentBoardItemType: BoardItemType;
  parentId: number;
}
