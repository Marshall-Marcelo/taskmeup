import { createTask } from '../repository/task.repository.js';
import type { NewTask } from '@taskmeup/shared';
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
