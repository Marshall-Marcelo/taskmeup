import { useQueryClient, useMutation } from '@tanstack/react-query';
import { authService } from '@/features/auth/service/auth';
import type { LoginCredentials } from '@taskmeup/shared';
import { queryKeys } from '@/lib/query-keys';

export function useLoginAccount() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (credentials: LoginCredentials) =>
      authService.login(credentials),
    onSuccess: (data) => {
      queryClient.setQueryData(queryKeys.user.current(), data.user);
    },
  });
}
