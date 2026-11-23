import express, { type Application } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import { errorMiddleware } from './middleware/error.middleware.js';

export function buildApp(): Application {
  const app = express();
  const environment = process.env.ENVIRONMENT;

  app.use(environment === 'dev' ? morgan('dev') : morgan('tiny'));
  app.use(
    cors({
      origin: process.env.CLIENT_URL,
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

  app.use(errorMiddleware);

  return app;
}
