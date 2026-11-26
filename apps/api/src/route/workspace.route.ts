import { Router } from 'express';
import type { Router as ExpressRouter } from 'express';
import { createNewWorkspaceController } from '../controller/workspace.controller.js';
import { verifyAccessToken } from '../middleware/auth.middleware.js';
import { validateBody } from '../middleware/validate.middleware.js';

const router: ExpressRouter = Router();

router.post('/new', verifyAccessToken, createNewWorkspaceController);

export default router;
