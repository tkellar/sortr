import mongoose from 'mongoose';
import PageItemModel, { IPageItem } from '../models/PageItem.model';
import BaseCRUDService from './baseCRUD.service';

class PageItemsService extends BaseCRUDService<IPageItem> {
  constructor(model: mongoose.Model<IPageItem>) {
    super(model);
  }

  async getByParentId(id: string) {
    return await PageItemModel.find({ parentPageItemId: id });
  }
}

const pageItemsService = new PageItemsService(PageItemModel);

export default pageItemsService;
