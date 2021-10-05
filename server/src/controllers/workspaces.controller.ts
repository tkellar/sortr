import catchAsync from '../utils/catchAsync';
import workspacesService from '../services/workspaces.service';
import ApiError from '../utils/ApiError';
import httpStatus from 'http-status';

const getWorkspaceById = catchAsync(async (req, res) => {
  const workspace = await workspacesService.getWorkspaceById(req.params.workspaceId);
  if (!workspace) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Could not find workspace');
  }

  res.status(httpStatus.OK).send(workspace);
});

const getWorkspaceByUserId = catchAsync(async (req, res) => {
  if (req.query.userId) {
    const workspaces = await workspacesService.getWorkspacesByUserId(req.query.userId as string);
    res.status(workspaces?.length ? httpStatus.OK : httpStatus.NO_CONTENT).send(workspaces);
  } else {
    throw new ApiError(httpStatus.BAD_REQUEST, "Expected parameter 'userId'");
  }
});

const createWorkspace = catchAsync(async (req, res) => {
  const workspace = await workspacesService.createWorkspace(req.body);

  res.status(httpStatus.CREATED).send(workspace);
});

const updateWorkspace = catchAsync(async (req, res) => {
  const workspace = await workspacesService.updateWorkspace(req.params.workspaceId, req.body);

  res.status(httpStatus.OK).send(workspace);
});

const deleteWorkspace = catchAsync(async (req, res) => {
  await workspacesService.deleteWorkspace(req.params.workspaceId);

  res.status(httpStatus.NO_CONTENT).send();
});

export default {
  getWorkspaceById,
  getWorkspaceByUserId,
  createWorkspace,
  updateWorkspace,
  deleteWorkspace,
};
