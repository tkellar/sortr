import catchAsync from '../utils/catchAsync';
import NotImplementedError from '../utils/NotImplementedError';

const getWorkspaceById = catchAsync(async (req, res) => {
  throw new NotImplementedError();
});

const getWorkspaceByUserId = catchAsync(async (req, res) => {
  throw new NotImplementedError();
});

const createWorkspace = catchAsync(async (req, res) => {
  throw new NotImplementedError();
});

const updateWorkspace = catchAsync(async (req, res) => {
  throw new NotImplementedError();
});

const deleteWorkspace = catchAsync(async (req, res) => {
  throw new NotImplementedError();
});

export default {
  getWorkspaceById,
  getWorkspaceByUserId,
  createWorkspace,
  updateWorkspace,
  deleteWorkspace,
};
