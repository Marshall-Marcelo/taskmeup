export interface Workspace {
  workspaceId: string;
  createdBy: string;
  workspaceName: string;
  createdAt: string;
  updatedAt: string | null;
}

export interface Workspace_DB {
  workspace_id: string;
  created_by: string;
  workspace_name: string;
  created_at: string;
  updated_at: string | null;
}

export interface NewWorkspace extends Omit<
  Workspace,
  'createdAt' | 'updatedAt'
> {}

type WorkspaceRoles = 'member' | 'moderator' | 'owner';

export interface WorkspaceMembers {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  role: WorkspaceRoles;
}

export interface WorkspaceMembers_DB {
  user_id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: WorkspaceRoles;
}

export interface WorkspaceList {
  workspaceId: string;
  workspaceName: string;
}

export interface WorkspaceList_DB {
  workspace_id: string;
  workspace_name: string;
}
