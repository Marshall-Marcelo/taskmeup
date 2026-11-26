export interface User_DB {
  user_id: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  created_at: string;
  updated_at: string | null;
  last_online_at: string | null;
}

export interface User {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string | null;
  lastOnlineAt: string | null;
}

export interface LoggedInUser extends Omit<User, 'password'> {}
