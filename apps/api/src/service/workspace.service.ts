import type { NewWorkspace } from '@taskmeup/shared';
import {
  createWorkspace,
  validateMembership,
  validateMemberRole,
  getWorkspaceDetails as getWorkspaceDetails_repo,
  getWorkspaces as getWorkspaces_repo,
  getWorkspaceMembers as getWorkspaceMembers_repo,
} from '../repository/workspace.repository.js';
import { v7 } from 'uuid';
import { NotFoundError, UnprocessableEntityError } from '@taskmeup/shared';
import type {
  Workspace,
  WorkspaceList,
  WorkspaceMembers,
} from '@taskmeup/shared';

export async function createNewWorkspace(
  workspaceName: string,
  userId: string,
) {
  if (!workspaceName || !userId) {
    throw new UnprocessableEntityError('Incomplete data');
  }

  const workspaceId = v7();

  const newWorkspace: NewWorkspace = {
    workspaceId,
    createdBy: userId,
    workspaceName,
  };

  const createdWorkspace = await createWorkspace(newWorkspace);

  const parsedCreatedWorkspace: WorkspaceList = {
    workspaceId: createdWorkspace.workspace_id,
    workspaceName: createdWorkspace.workspace_name,
  };

  return parsedCreatedWorkspace;
}

export async function verifyMembership(userId: string, workspaceId: string) {
  const isValidMember = await validateMembership(userId, workspaceId);

  return isValidMember;
}

export async function verifyWorkspaceRole(userId: string, workspaceId: string) {
  const isValidRole = await validateMemberRole(userId, workspaceId);

  return isValidRole;
}

export async function getWorkspaceDetails(workspaceId: string) {
  const workspace = await getWorkspaceDetails_repo(workspaceId);

  if (!workspace) {
    throw new NotFoundError('Workspace not found');
  }

  const parsedWorkspace: Workspace = {
    workspaceId: workspace.workspace_id,
    createdBy: workspace.created_by,
    workspaceName: workspace.workspace_name,
    createdAt: workspace.created_at,
    updatedAt: workspace.updated_at ?? null,
  };

  return parsedWorkspace;
}

export async function getWorkspaces(userId: string) {
  const workspaces = await getWorkspaces_repo(userId);

  const parsedWorkspaces: WorkspaceList[] = workspaces.map((workspace) => ({
    workspaceId: workspace.workspace_id,
    workspaceName: workspace.workspace_name,
  }));

  return parsedWorkspaces;
}

export async function getWorkspaceMembers(workspaceId: string) {
  const workspaceMembers = await getWorkspaceMembers_repo(workspaceId);

  const parsedWorkspaceMembers: WorkspaceMembers[] = workspaceMembers.map(
    (member) => ({
      userId: member.user_id,
      firstName: member.first_name,
      lastName: member.last_name,
      email: member.email,
      role: member.role,
    }),
  );

  return parsedWorkspaceMembers;
}
