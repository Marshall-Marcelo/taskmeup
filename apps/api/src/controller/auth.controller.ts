import type { Request, Response, NextFunction } from 'express';
import { registerUser, loginUser } from '../service/auth.service.js';
import type { NewUser } from '@taskmeup/shared';

export async function registerUserController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { firstName, lastName, email, password } = req.body;

    const newUser: NewUser = {
      firstName,
      lastName,
      email,
      password,
    };

    await registerUser(newUser);

    res.status(201).json({ message: 'Account creation successful' });
  } catch (error) {
    next(error);
  }
}

export async function loginUserController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { email, password } = req.body;
    const { refreshToken, accessToken, parsedUser } = await loginUser(
      email,
      password,
    );

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      sameSite: 'none',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      sameSite: 'none',
      maxAge: 15 * 60 * 1000,
    });

    res.status(200).json({ user: parsedUser, message: 'Login Success' });
  } catch (error) {
    next(error);
  }
}
