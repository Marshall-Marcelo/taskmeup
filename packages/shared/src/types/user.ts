export interface User {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt?: string;
  lastOnlineAt?: string;
}

export interface NewUser extends Omit<
  User,
  'createdAt' | 'updatedAt' | 'lastOnlineAt' | 'userId'
> {}

export interface LoggedInUser extends Omit<User, 'password'> {}
