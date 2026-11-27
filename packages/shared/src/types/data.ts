import type { LoggedInUser } from './user.js';
import type { Workspace, WorkspaceList } from './workspace.js';

export interface MessageResponse {
  message: string;
}

export interface LoginResponse {
  user: LoggedInUser;
  message: string;
}

export interface NewWorkspaceResponse {
  workspace: WorkspaceList;
  message: string;
}

export interface GetWorkspaceResponse {
  workspace: Workspace;
  message: string;
}
