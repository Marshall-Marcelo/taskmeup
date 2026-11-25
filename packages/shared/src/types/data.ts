import type { LoggedInUser } from './user.js';

export interface MessageResponse {
  message: string;
}

export interface LoginResponse {
  user: LoggedInUser;
  message: string;
}
