import type { Request, Response, NextFunction } from 'express';
import { UnauthorizedError, type NewTask } from '@taskmeup/shared';
import {
  createNewTask,
  getTasksForWorkspace,
} from '../service/task.service.js';

export async function createNewTaskController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const {
      workspaceId,
      taskName,
      taskDescription,
      status,
      priority,
      dueDate,
    } = req.body;
    const userId = req.userId;

    if (!userId) {
      throw new UnauthorizedError('Invalid Access');
    }

    const newTask: NewTask = {
      workspaceId,
      taskName,
      taskDescription,
      status,
      priority,
      dueDate,
    };

    await createNewTask(newTask, userId);

    res.status(201).json({ message: 'Task creation successful' });
  } catch (error) {
    next(error);
  }
}

export async function getTasksForWorkspaceController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { workspaceId } = req.params;

    if (!workspaceId || Array.isArray(workspaceId)) {
      throw new UnauthorizedError('Invalid Access');
    }

    const workspaceTasks = await getTasksForWorkspace(workspaceId);

    res.status(200).json(workspaceTasks);
  } catch (error) {
    next(error);
  }
}
