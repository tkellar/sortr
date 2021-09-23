import { BoardItemType } from './BoardItemType';
import { IBoardItem } from './IBoardItem';
import { ICoordinates } from './ICoordinates';

export class FileViewModel implements IBoardItem, ICoordinates {
  id: number;
  boardItemType: BoardItemType;
  parentBoardItemType: BoardItemType;
  parentId: number;
  name: string;
  extension: string;
  x: number;
  y: number;
}
