import {
  createUser,
  getUserWithEmail,
  getUserWithId,
} from '../repository/auth.repository.js';
import { v7 } from 'uuid';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import {
  NotFoundError,
  UnauthorizedError,
  type NewUser,
  type LoggedInUser,
} from '@taskmeup/shared';
import { generateAccessToken, generateRefreshToken } from '../utils/token.js';
import { env } from '../configs/env.js';

export async function registerUser(newUser: NewUser) {
  const hashedPassword = await bcrypt.hash(newUser.password, 10);
  const userId = v7();
  const workspaceId = v7();

  const formattedNewUser: NewUser = {
    ...newUser,
    password: hashedPassword,
  };

  await createUser(userId, formattedNewUser, workspaceId);
}

export async function loginUser(email: string, password: string) {
  const user = await getUserWithEmail(email);

  if (!user) {
    throw new NotFoundError('User does not exist');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new UnauthorizedError('Invalid credentials');
  }

  const parsedUser: LoggedInUser = {
    userId: user.user_id,
    firstName: user.first_name,
    lastName: user.last_name,
    email: user.email,
    createdAt: user.created_at,
    updatedAt: user.updated_at ?? null,
    lastOnlineAt: user.last_online_at ?? null,
  };

  const refreshToken = generateRefreshToken(parsedUser.userId);
  const accessToken = generateAccessToken(parsedUser.userId);

  return { refreshToken, accessToken, parsedUser };
}

export async function refreshCurrentUser(accessToken: string) {
  const payload = jwt.verify(accessToken, env.JWT_SECRET_ACCESS);

  if (typeof payload === 'string') {
    throw new UnauthorizedError('Invalid Access Token');
  }

  if (payload.type !== 'access') {
    throw new UnauthorizedError('Invalid Access Token');
  }

  if (!payload.sub) {
    throw new UnauthorizedError('Invalid Access Token');
  }

  const user = await getUserWithId(payload.sub);

  if (!user) {
    throw new NotFoundError('User does not exist');
  }

  const parsedUser: LoggedInUser = {
    userId: user.user_id,
    firstName: user.first_name,
    lastName: user.last_name,
    email: user.email,
    createdAt: user.created_at,
    updatedAt: user.updated_at ?? null,
    lastOnlineAt: user.last_online_at ?? null,
  };

  return parsedUser;
}

export async function refreshAccessToken(refreshToken: string) {
  const payload = jwt.verify(refreshToken, env.JWT_SECRET_REFRESH);

  if (typeof payload === 'string') {
    throw new UnauthorizedError('Invalid Refresh Token');
  }

  if (payload.type !== 'refresh') {
    throw new UnauthorizedError('Invalid Refresh Token');
  }

  if (!payload.sub) {
    throw new UnauthorizedError('Invalid Refresh Token');
  }

  const accessToken = generateAccessToken(payload.sub);

  return accessToken;
}
