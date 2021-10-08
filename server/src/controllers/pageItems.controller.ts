import catchAsync from '../utils/catchAsync';
import pageItemsService from '../services/pageItems.service';
import ApiError from '../utils/ApiError';
import httpStatus from 'http-status';

const getPageItemById = catchAsync(async (req, res) => {
  const pageItem = await pageItemsService.getById(req.params.pageItemId);
  if (!pageItem) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Page item does not exist');
  }

  res.status(httpStatus.OK).send(pageItem);
});

const getPageItemByParentId = catchAsync(async (req, res) => {
  const pageItems = await pageItemsService.getByParentId(req.query.parentPageItemId as string);

  res.status(pageItems ? httpStatus.OK : httpStatus.NO_CONTENT).send(pageItems);
});

const createPageItem = catchAsync(async (req, res) => {
  const created = await pageItemsService.create(req.body);

  res.status(httpStatus.CREATED).send(created);
});

const updatePageItem = catchAsync(async (req, res) => {
  const updated = await pageItemsService.update(req.params.pageItemId, req.body);
  if (!updated) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      'Unable to update page item -- page item does not exist',
    );
  }

  res.status(httpStatus.OK).send(updated);
});

const deletePageItem = catchAsync(async (req, res) => {
  await pageItemsService.delete(req.params.pageItemId);

  res.status(httpStatus.NO_CONTENT).send();
});

export default {
  getPageItemById,
  getPageItemByParentId,
  createPageItem,
  updatePageItem,
  deletePageItem,
};
