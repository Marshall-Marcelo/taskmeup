import { pool } from '../configs/db.js';
import type { NewUser } from '@taskmeup/shared';

export async function createUser(userId: string, newUser: NewUser) {
  const result = await pool.query(
    `INSERT INTO users (user_id, first_name, last_name, email, password)
     VALUES ($1, $2, $3, $4)`,
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
