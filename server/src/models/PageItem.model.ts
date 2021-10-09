import mongoose, { Schema } from 'mongoose';

export interface IPageItem {
  name: string;
  parentPageItemId: string;
  pageItemType: string;
}

const pageItemSchema = new Schema<IPageItem>(
  {
    name: {
      type: String,
      required: true,
    },
    parentPageItemId: {
      type: String,
      require: true,
    },
  },
  { discriminatorKey: 'pageItemType' },
);

const PageItem = mongoose.model<IPageItem>('PageItem', pageItemSchema);

export default PageItem;
