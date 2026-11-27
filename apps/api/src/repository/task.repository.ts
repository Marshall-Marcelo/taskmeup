import { pool } from '../configs/db.js';
import type { NewTask } from '@taskmeup/shared';

export async function createTask(
  newTask: NewTask,
  taskId: string,
  userId: string,
) {
  const result = await pool.query(
    `INSERT INTO tasks
    (task_id, workspace_id, task_name, task_description, created_by, status, priority, due_date)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
    [
      taskId,
      newTask.workspaceId,
      newTask.taskName,
      newTask.taskDescription,
      userId,
      newTask.status,
      newTask.priority,
      newTask.dueDate,
    ],
  );

  return (result.rowCount ?? 0) > 0;
}
