import { Router } from 'express';
import type { Router as ExpressRouter } from 'express';
import {
  createNewWorkspaceController,
  getWorkspaceDetailsController,
  getWorkspacesController,
  getWorkspaceMembersController,
} from '../controller/workspace.controller.js';
import { verifyAccessToken } from '../middleware/auth.middleware.js';
import {
  validateBody,
  validateWorkspaceId,
} from '../middleware/validate.middleware.js';

const router: ExpressRouter = Router();

// Static Routes
router.post('/new', verifyAccessToken, createNewWorkspaceController);
router.get('/list', verifyAccessToken, getWorkspacesController);

// Nested Resource Routes
router.get(
  '/:workspaceId/members',
  verifyAccessToken,
  validateWorkspaceId('params'),
  getWorkspaceMembersController,
);

// General Routes
router.get(
  '/:workspaceId',
  verifyAccessToken,
  validateWorkspaceId('params'),
  getWorkspaceDetailsController,
);

export default router;
