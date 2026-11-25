import { createContext } from 'react';
import type { LoggedInUser } from '@taskmeup/shared';
import { useGetCurrentUser } from '@/features/auth/hooks/useRefreshUser';

interface AuthContextType {
  user: LoggedInUser | undefined;
  isAuthenticated: boolean;
  isRefreshingUser: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

type AuthProps = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: AuthProps) {
  const { data: currentUser, isPending } = useGetCurrentUser();
  const user = currentUser ?? undefined;

  console.log(currentUser, 'Auth Context');

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: user !== undefined,
        isRefreshingUser: isPending,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
