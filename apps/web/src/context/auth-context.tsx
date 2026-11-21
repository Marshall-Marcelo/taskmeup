import { createContext } from 'react';

interface AuthContextType {
  user: string | undefined;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

type AuthProps = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: AuthProps) {
  const user = 'Test';
  return (
    <AuthContext.Provider value={{ user, isAuthenticated: user !== undefined }}>
      {children}
    </AuthContext.Provider>
  );
}
