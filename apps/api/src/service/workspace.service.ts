import type { NewWorkspace } from '@taskmeup/shared';
import {
  createWorkspace,
  validateMembership,
  validateMemberRole,
  getWorkspaceDetails as getWorkspaceDetails_repo,
} from '../repository/workspace.repository.js';
import { v7 } from 'uuid';
import { NotFoundError, UnprocessableEntityError } from '@taskmeup/shared';
import type { Workspace } from '@taskmeup/shared';

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

  const newWorkspaceId = await createWorkspace(newWorkspace);

  return newWorkspaceId;
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
