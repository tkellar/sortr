import ApiError from '../utils/ApiError';
import httpStatus from 'http-status';
import PageItemModel, { IPageItem } from '../models/PageItem.model';

class PageItemsService {
  async getPageItemById(id: string) {
    return await PageItemModel.findById(id);
  }
}

const pageItemsService = new PageItemsService();

export default pageItemsService;
