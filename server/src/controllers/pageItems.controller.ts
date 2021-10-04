import catchAsync from '../utils/catchAsync';
import NotImplementedError from '../utils/NotImplementedError';

const getPageItemById = catchAsync(async (req, res) => {
  throw new NotImplementedError();
});

const getPageItemByParentId = catchAsync(async (req, res) => {
  throw new NotImplementedError();
});

const createPageItem = catchAsync(async (req, res) => {
  throw new NotImplementedError();
});

const updatePageItem = catchAsync(async (req, res) => {
  throw new NotImplementedError();
});

const deletePageItem = catchAsync(async (req, res) => {
  throw new NotImplementedError();
});

export default {
  getPageItemById,
  getPageItemByParentId,
  createPageItem,
  updatePageItem,
  deletePageItem,
};
