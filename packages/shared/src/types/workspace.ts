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
  workspaceId: string;
  userId: string;
  role: WorkspaceRoles;
  joinedAt: string;
}

export interface WorkspaceMembers_DB {
  workspace_id: string;
  user_id: string;
  role: WorkspaceRoles;
  joined_at: string;
}
