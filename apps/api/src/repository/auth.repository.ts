import { pool } from '../configs/db.js';
import type { NewUser, User_DB } from '@taskmeup/shared';

export async function createUser(userId: string, newUser: NewUser) {
  const result = await pool.query(
    `INSERT INTO users (user_id, first_name, last_name, email, password)
     VALUES ($1, $2, $3, $4, $5)`,
    [
      userId,
      newUser.firstName,
      newUser.lastName,
      newUser.email,
      newUser.password,
    ],
  );

  return (result.rowCount ?? 0) > 0;
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
