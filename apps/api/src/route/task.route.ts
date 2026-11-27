import { Router } from 'express';
import type { Router as ExpressRouter } from 'express';
import { createNewTaskController } from '../controller/task.controller.js';
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

export default router;
