import { BehaviorSubject } from 'rxjs';
import { WorkspaceViewModel } from '../models';
import axios from 'axios';
import config from '../../config.json';
import authenticationService from './AuthenticationService';

class WorkspaceService {
  private readonly API_HOST = config.API_HOST;
  private workspaces$: BehaviorSubject<WorkspaceViewModel[]>;
  private fetchedWorkspaces = false;

  get workspaces() {
    if (!this.fetchedWorkspaces) {
      this.fetchWorkspaces();
    }

    return this.workspaces$.asObservable();
  }

  constructor() {
    this.workspaces$ = new BehaviorSubject([]);
  }

  private async fetchWorkspaces() {
    this.fetchedWorkspaces = true;

    const currentUser = authenticationService.currentUserValue.user;
    const res = await axios.get<WorkspaceViewModel[]>(
      `${this.API_HOST}/api/v1/workspaces?userId=${currentUser.id}`,
    );

    if (res && res.status === 200) {
      this.workspaces$.next(res.data.map((workspace) => new WorkspaceViewModel(workspace)));
    }
  }
}

const workspaceService = new WorkspaceService();

export default workspaceService;
