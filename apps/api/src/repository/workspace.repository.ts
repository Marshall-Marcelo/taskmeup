import { pool } from '../configs/db.js';
import type {
  NewWorkspace,
  Workspace_DB,
  WorkspaceList_DB,
} from '@taskmeup/shared';

// Add query related message group creation here
export async function createWorkspace(
  newWorkspace: NewWorkspace,
): Promise<WorkspaceList_DB> {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    const workspaceResult = await client.query(
      `INSERT INTO workspace(workspace_id, created_by, workspace_name) 
       VALUES ($1, $2, $3)
       RETURNING workspace_id, workspace_name`,
      [
        newWorkspace.workspaceId,
        newWorkspace.createdBy,
        newWorkspace.workspaceName,
      ],
    );

    const createdWorkspace: WorkspaceList_DB = workspaceResult.rows[0];

    await client.query(
      `INSERT INTO workspace_members(workspace_id, user_id, role)
       VALUES ($1, $2, $3)`,
      [createdWorkspace.workspace_id, newWorkspace.createdBy, 'owner'],
    );

    await client.query('COMMIT');

    return createdWorkspace ?? null;
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}

export async function validateMembership(userId: string, workspaceId: string) {
  const result = await pool.query(
    `SELECT 1 FROM workspace_members
     WHERE workspace_id = $1 and user_id = $2`,
    [workspaceId, userId],
  );

  return (result.rowCount ?? 0) > 0;
}

export async function validateMemberRole(userId: string, workspaceId: string) {
  const result = await pool.query(
    `SELECT role FROM workspace_members
     WHERE workspace_id = $1 and user_id = $2`,
    [workspaceId, userId],
  );

  const role = result.rows[0].role;

  return role ?? null;
}

export async function getWorkspaceDetails(
  workspaceId: string,
): Promise<Workspace_DB | null> {
  const result = await pool.query<Workspace_DB>(
    `SELECT * FROM workspace
     WHERE workspace_id = $1`,
    [workspaceId],
  );

  return result.rows[0] ?? null;
}

export async function getWorkspaces(
  userId: string,
): Promise<WorkspaceList_DB[]> {
  const result = await pool.query<WorkspaceList_DB>(
    `SELECT w.workspace_id, w.workspace_name
     FROM workspace_members wm
     INNER JOIN workspace w
     ON w.workspace_id = wm.workspace_id
     WHERE wm.user_id = $1
    `,
    [userId],
  );

  return result.rows;
}
