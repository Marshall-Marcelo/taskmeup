import { pool } from '../configs/db.js';
import type { NewUser, User_DB } from '@taskmeup/shared';

export async function createUser(
  userId: string,
  newUser: NewUser,
  workspaceId: string,
) {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');
    const userCreation = await client.query(
      `INSERT INTO users (user_id, first_name, last_name, email, password)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING user_id, first_name`,
      [
        userId,
        newUser.firstName,
        newUser.lastName,
        newUser.email,
        newUser.password,
      ],
    );

    const createdUser = userCreation.rows[0];

    const workspaceCreation = await client.query(
      `INSERT INTO workspace(workspace_id, created_by, workspace_name)
       VALUES ($1, $2, $3)
       RETURNING workspace_id, workspace_name`,
      [
        workspaceId,
        createdUser.user_id,
        `${createdUser.first_name}'s Workspace`,
      ],
    );

    const createdWorkspace = workspaceCreation.rows[0];

    await client.query(
      `INSERT INTO workspace_members(workspace_id, user_id, role)
      VALUES($1, $2, $3)`,
      [createdWorkspace.workspace_id, createdUser.user_id, 'owner'],
    );

    await client.query('COMMIT');
    return true;
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}

export async function getUserWithEmail(email: string): Promise<User_DB | null> {
  const result = await pool.query<User_DB>(
    `SELECT * FROM users
     WHERE email = $1
     LIMIT 1`,
    [email],
  );

  return result.rows[0] ?? null;
}

export async function getUserWithId(userId: string): Promise<User_DB | null> {
  const result = await pool.query<User_DB>(
    `SELECT * FROM users
     WHERE user_id = $1
     LIMIT 1`,
    [userId],
  );

  return result.rows[0] ?? null;
}
