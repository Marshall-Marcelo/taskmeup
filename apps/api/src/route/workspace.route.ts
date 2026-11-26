import { Router } from 'express';
import type { Router as ExpressRouter } from 'express';
import {
  createNewWorkspaceController,
  getWorkspaceDetailsController,
  getWorkspacesController,
} from '../controller/workspace.controller.js';
import { verifyAccessToken } from '../middleware/auth.middleware.js';
import {
  validateBody,
  validateWorkspaceId,
} from '../middleware/validate.middleware.js';

const router: ExpressRouter = Router();

router.post('/new', verifyAccessToken, createNewWorkspaceController);
router.get('/list', verifyAccessToken, getWorkspacesController);

router.get(
  '/:workspaceId',
  verifyAccessToken,
  validateWorkspaceId,
  getWorkspaceDetailsController,
);

export default router;
