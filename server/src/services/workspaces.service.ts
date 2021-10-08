import mongoose from 'mongoose';
import WorkspaceModel, { IWorkspace } from '../models/Workspace.model';
import BaseCRUDService from './baseCRUD.service';

class WorkspacesService extends BaseCRUDService<IWorkspace> {
  constructor(model: mongoose.Model<IWorkspace>) {
    super(model);
  }

  async getByUserId(userId: string) {
    return await this.model.find({ userId });
  }
}

const workspacesService = new WorkspacesService(WorkspaceModel);

export default workspacesService;
