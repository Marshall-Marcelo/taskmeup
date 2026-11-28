import { pool } from '../configs/db.js';
import type { NewTask, Task_DB } from '@taskmeup/shared';

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

export async function getTasksForWorkspace(
  workspaceId: string,
): Promise<Task_DB[]> {
  const result = await pool.query<Task_DB>(
    `SELECT * FROM tasks
     WHERE workspace_id = $1
     ORDER BY due_date ASC NULLS LAST`,
    [workspaceId],
  );

  return result.rows;
}

export async function getTasksForUser(userId: string) {}
