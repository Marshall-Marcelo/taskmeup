import { ApiService } from '@/lib/api';
import type {
  NewUser,
  LoggedInUser,
  LoginCredentials,
  MessageResponse,
} from '@taskmeup/shared';

class AuthService extends ApiService {
  async register(newUser: NewUser): Promise<MessageResponse> {
    const data: MessageResponse = await this.handleFetch(`/auth/register`, {
      method: 'POST',
      body: JSON.stringify({
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        password: newUser.password,
      }),
    });

    return data;
  }

  async login(credentials: LoginCredentials): Promise<LoggedInUser> {
    const data: LoggedInUser = await this.handleFetch(`/auth/login`, {
      method: 'POST',
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    return data;
  }
}

export const authService = new AuthService();
