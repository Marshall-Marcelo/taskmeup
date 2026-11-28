import { Router } from 'express';
import type { Router as ExpressRouter } from 'express';
import {
  createNewTaskController,
  getTasksForWorkspaceController,
} from '../controller/task.controller.js';
import { verifyAccessToken } from '../middleware/auth.middleware.js';
import {
  validateBody,
  validateWorkspaceId,
} from '../middleware/validate.middleware.js';
import { NewTaskSchema } from '@taskmeup/shared';

const router: ExpressRouter = Router();

router.post(
  '/new',
  verifyAccessToken,
  validateWorkspaceId('body'),
  validateBody(NewTaskSchema),
  createNewTaskController,
);

router.get(
  '/:workspaceId/tasks',
  verifyAccessToken,
  validateWorkspaceId('params'),
  getTasksForWorkspaceController,
);

export default router;
