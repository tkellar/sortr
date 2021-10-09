import mongoose, { Schema } from 'mongoose';

export interface IPage {
  name: string;
  createdDate: Date;
  updatedDate?: Date;
}

export interface IWorkspace {
  userId: string;
  name: string;
  pages: IPage[];
  createdDate: Date;
  updatedDate?: Date;
}

const pageSchema = new Schema<IPage>({
  name: String,
  createdDate: {
    type: Date,
    default: new Date(),
  },
  updatedDate: Date,
});

const workspaceSchema = new Schema<IWorkspace>({
  userId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  pages: {
    type: [pageSchema],
    default: [
      {
        name: 'Page 1',
        createdDate: new Date(),
      },
    ],
  },
  createdDate: {
    type: Date,
    default: new Date(),
  },
  updatedDate: Date,
});

const Workspace = mongoose.model<IWorkspace>('Workspace', workspaceSchema);

export default Workspace;
