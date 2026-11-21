import { useEffect } from 'react';
import { socket } from '@/lib/socket';

export function useSocket(isAuthenticated: boolean) {
  useEffect(() => {
    if (!isAuthenticated) return;

    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, [isAuthenticated]);

  return socket;
}
