import type { NewWorkspace } from '@taskmeup/shared';
import { createWorkspace } from '../repository/workspace.repository.js';
import { v7 } from 'uuid';
import { UnprocessableEntityError } from '@taskmeup/shared';

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
