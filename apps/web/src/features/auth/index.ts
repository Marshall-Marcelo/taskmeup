import { useAuth } from '@/features/auth/hooks/useAuth';
import {
  AuthContext,
  AuthProvider,
} from '@/features/auth/context/auth-context';

import LandingPage from '@/features/auth/pages/LandingPage';
import LoginPage from '@/features/auth/pages/LoginPage';
import NotFoundPage from '@/features/auth/pages/NotFoundPage';
import RegisterPage from '@/features/auth/pages/RegisterPage';

export {
  LandingPage,
  LoginPage,
  NotFoundPage,
  RegisterPage,
  useAuth,
  AuthContext,
  AuthProvider,
};
