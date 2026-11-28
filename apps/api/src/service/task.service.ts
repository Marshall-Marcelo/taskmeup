import {
  createTask,
  getTasksForWorkspace as getTasksForWorkspace_repo,
} from '../repository/task.repository.js';
import type {
  NewTask,
  Task,
  TaskPriority,
  GroupedTasks,
} from '@taskmeup/shared';
import { v7 } from 'uuid';
import { UnprocessableEntityError } from '@taskmeup/shared';

export async function createNewTask(newTask: NewTask, userId: string) {
  if (!newTask || !userId) {
    throw new UnprocessableEntityError('Incomplete data');
  }

  const taskId = v7();

  const isTaskCreated = await createTask(newTask, taskId, userId);

  return isTaskCreated;
}

export async function getTasksForWorkspace(workspaceId: string) {
  if (!workspaceId) {
    throw new UnprocessableEntityError('Incomplete data');
  }

  const workspaceTasks = await getTasksForWorkspace_repo(workspaceId);

  const parsedWorkspaceTasks: Task[] = workspaceTasks.map((task) => ({
    taskId: task.task_id,
    taskName: task.task_name,
    taskDescription: task.task_description,
    workspaceId: task.workspace_id,
    createdBy: task.created_by,
    status: task.status,
    priority: task.priority,
    dueDate: task.due_date ?? null,
    createdAt: task.created_at,
    updatedAt: task.updated_at ?? null,
  }));

  const groupedWorkspaceTasks = parsedWorkspaceTasks.reduce<
    Record<TaskPriority, Task[]>
  >(
    (groups, task) => {
      const priority = task.priority;

      if (!groups[priority]) {
        groups[priority] = [];
      }

      groups[priority].push(task);
      return groups;
    },
    { high: [], medium: [], low: [] },
  );

  const parsedGroupedWorkspaceTasks = Object.entries(groupedWorkspaceTasks);

  const formattedWorkspaceTasks: GroupedTasks[] =
    parsedGroupedWorkspaceTasks.map(([priority, tasks]) => ({
      priority: priority as TaskPriority,
      tasks,
    }));

  return formattedWorkspaceTasks;
}
