import catchAsync from '../utils/catchAsync';
import workspacesService from '../services/workspaces.service';
import ApiError from '../utils/ApiError';
import httpStatus from 'http-status';

const getWorkspaceById = catchAsync(async (req, res) => {
  const workspace = await workspacesService.getById(req.params.workspaceId);
  if (!workspace) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Could not find workspace');
  }

  res.status(httpStatus.OK).send(workspace);
});

const getWorkspaceByUserId = catchAsync(async (req, res) => {
  if (req.query.userId) {
    const workspaces = await workspacesService.getByUserId(req.query.userId as string);
    res.status(workspaces ? httpStatus.OK : httpStatus.NO_CONTENT).send(workspaces);
  } else {
    throw new ApiError(httpStatus.BAD_REQUEST, "Expected parameter 'userId'");
  }
});

const createWorkspace = catchAsync(async (req, res) => {
  const workspace = await workspacesService.create(req.body);

  res.status(httpStatus.CREATED).send(workspace);
});

const updateWorkspace = catchAsync(async (req, res) => {
  const workspace = await workspacesService.update(req.params.workspaceId, req.body);
  if (!workspace) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      'Unable to update workspace -- workspace does not exist',
    );
  }

  res.status(httpStatus.OK).send(workspace);
});

const deleteWorkspace = catchAsync(async (req, res) => {
  await workspacesService.delete(req.params.workspaceId);

  res.status(httpStatus.NO_CONTENT).send();
});

export default {
  getWorkspaceById,
  getWorkspaceByUserId,
  createWorkspace,
  updateWorkspace,
  deleteWorkspace,
};
