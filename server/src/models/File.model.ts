import { Schema } from 'mongoose';
import PageItemModel, { IPageItem } from './PageItem.model';

export interface IFile extends IPageItem {
  x: number;
  y: number;
  extension: string;
}

const fileSchema = new Schema<IFile>({
  x: {
    type: Number,
    required: true,
  },
  y: {
    type: Number,
    required: true,
  },
  extension: String,
});

const FileModel = PageItemModel.discriminator('file', fileSchema);

export default FileModel;
