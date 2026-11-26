import { pool } from '../configs/db.js';
import type { NewWorkspace, Workspace_DB } from '@taskmeup/shared';

// Add query related message group creation here
export async function createWorkspace(newWorkspace: NewWorkspace) {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    const workspaceResult = await client.query(
      `INSERT INTO workspace(workspace_id, created_by, workspace_name) 
       VALUES ($1, $2, $3)
       RETURNING workspace_id`,
      [
        newWorkspace.workspaceId,
        newWorkspace.createdBy,
        newWorkspace.workspaceName,
      ],
    );

    const workspaceId = workspaceResult.rows[0].workspace_id;

    await client.query(
      `INSERT INTO workspace_members(workspace_id, user_id, role)
       VALUES ($1, $2, $3)`,
      [workspaceId, newWorkspace.createdBy, 'owner'],
    );

    await client.query('COMMIT');

    return workspaceId ?? null;
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
