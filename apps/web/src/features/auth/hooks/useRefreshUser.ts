import { useQuery } from '@tanstack/react-query';
import { authService } from '@/features/auth/service/auth';
import { queryKeys } from '@/lib/query-keys';

export function useGetCurrentUser() {
  return useQuery({
    queryKey: queryKeys.user.current(),
    queryFn: () => authService.refreshUser(),
  });
}
