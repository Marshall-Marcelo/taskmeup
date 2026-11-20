import express, { type Application } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';

export function buildApp(): Application {
  const app = express();
  const environment = process.env.ENVIRONMENT;

  app.use(environment === 'dev' ? morgan('dev') : morgan('tiny'));
  app.use(
    cors({
      origin: process.env.CLIENT_URL,
    }),
  );

  app.use(express.json());
  app.use(cookieParser());

  return app;
}
