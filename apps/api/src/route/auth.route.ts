import { Router } from 'express';
import type { Router as ExpressRouter } from 'express';
import {
  registerUserController,
  loginUserController,
} from '../controller/auth.controller.js';
import { verifyAccessToken } from '../middleware/auth.middleware.js';
import { validateBody } from '../middleware/validate.middleware.js';
import { NewUserSchema } from '@taskmeup/shared';

const router: ExpressRouter = Router();

// Unauthorized Routes
router.post('/register', validateBody(NewUserSchema), registerUserController);
router.post('/login', loginUserController);

export default router;
