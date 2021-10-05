import WorkspaceModel, { IWorkspace } from '../models/Workspace.model';
import ApiError from '../utils/ApiError';
import httpStatus from 'http-status';

class WorkspacesService {
  async getWorkspaceById(id: string) {
    return await WorkspaceModel.findById(id);
  }

  async getWorkspacesByUserId(userId: string) {
    return await WorkspaceModel.find({ userId });
  }

  async createWorkspace(workspace: IWorkspace) {
    return await WorkspaceModel.create(workspace);
  }

  async updateWorkspace(id: string, update: Partial<IWorkspace>) {
    const workspace = await this.getWorkspaceById(id);
    if (!workspace) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Could not find workspace');
    }

    Object.assign(workspace, update);
    workspace.updatedDate = new Date();
    await workspace.save();

    return workspace;
  }

  async deleteWorkspace(id: string) {
    const workspace = await this.getWorkspaceById(id);
    if (!workspace) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Could not find workspace');
    }

    await workspace.remove();
  }
}

const workspacesService = new WorkspacesService();

export default workspacesService;
