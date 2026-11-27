import { env } from './configs/env.js';
import express, { type Application } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import { errorMiddleware } from './middleware/error.middleware.js';
import authRoutes from './route/auth.route.js';
import workspaceRoutes from './route/workspace.route.js';
import taskRoutes from './route/task.route.js';

export function buildApp(): Application {
  const app = express();
  const environment = env.ENVIRONMENT;

  app.use(environment === 'dev' ? morgan('dev') : morgan('tiny'));
  app.use(
    cors({
      origin: env.CLIENT_URL,
      credentials: true,
    }),
  );

  app.get('/health', (_req, res) => {
    res.status(200).json({
      status: 'OK',
      message: 'Server is running',
      timestamp: new Date().toISOString(),
    });
  });

  app.use(express.json());
  app.use(cookieParser());

  // routes go here
  app.use('/auth', authRoutes);
  app.use('/workspace', workspaceRoutes);
  app.use('/task', taskRoutes);

  app.use(errorMiddleware);

  return app;
}
