import { useSocket } from '@/hooks/useSocket';
import { useAuth } from '@/features/auth';

type Props = {
  children: React.ReactNode;
};

export function SocketProvider({ children }: Props) {
  const { isAuthenticated } = useAuth();
  useSocket(isAuthenticated);

  return <>{children}</>;
}
