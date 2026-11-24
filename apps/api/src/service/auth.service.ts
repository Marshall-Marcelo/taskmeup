import { createUser, getUserWithEmail } from '../repository/auth.repository.js';
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

export async function registerUser(newUser: NewUser) {
  const hashedPassword = await bcrypt.hash(newUser.password, 10);
  const userId = v7();

  const formattedNewUser: NewUser = {
    ...newUser,
    password: hashedPassword,
  };

  await createUser(userId, formattedNewUser);
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
    email,
    createdAt: user.created_at,
    updatedAt: user.updated_at,
    lastOnlineAt: user.last_online_at,
  };

  const refreshToken = generateRefreshToken(parsedUser.userId);
  const accessToken = generateAccessToken(parsedUser.userId);

  return { refreshToken, accessToken, parsedUser };
}
