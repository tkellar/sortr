import { Schema } from 'mongoose';
import PageItemModel, { IPageItem } from './PageItem.model';

export interface IBoard extends IPageItem {
  height: number;
  width: number;
  x: number;
  y: number;
}

const boardSchema = new Schema<IBoard>({
  height: {
    type: Number,
    required: true,
  },
  width: {
    type: Number,
    required: true,
  },
  x: {
    type: Number,
    required: true,
  },
  y: {
    type: Number,
    required: true,
  },
});

const Board = PageItemModel.discriminator('board', boardSchema);

export default Board;
