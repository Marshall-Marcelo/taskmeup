import type { LoggedInUser } from './user.js';
import type { Workspace } from './workspace.js';

export interface MessageResponse {
  message: string;
}

export interface LoginResponse {
  user: LoggedInUser;
  message: string;
}

export interface NewWorkspaceResponse {
  workspaceId: string;
  message: string;
}

export interface GetWorkspaceResponse {
  workspace: Workspace;
  message: string;
}
