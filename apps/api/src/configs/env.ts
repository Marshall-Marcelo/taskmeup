import dotenv from 'dotenv';

dotenv.config();

const requiredEnv = (key: string) => {
  const value = process.env[key];

  if (!value) {
    throw new Error(`Missing env variable : ${key}`);
  }

  return value;
};

export const env = {
  PORT: requiredEnv('PORT'),
  ENVIRONMENT: requiredEnv('ENVIRONMENT'),
  JWT_SECRET_ACCESS: requiredEnv('JWT_SECRET_ACCESS'),
  JWT_SECRET_REFRESH: requiredEnv('JWT_SECRET_REFRESH'),
  JWT_EXPIRES_IN: requiredEnv('JWT_EXPIRES_IN'),
  DATABASE_URL: requiredEnv('DATABASE_URL'),
  CLIENT_URL: requiredEnv('CLIENT_URL'),
};
