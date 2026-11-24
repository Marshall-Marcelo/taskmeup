import { useMutation } from '@tanstack/react-query';
import { authService } from '@/features/auth/service/auth';
import type { NewUser } from '@taskmeup/shared';

export function useRegisterAccount() {
  return useMutation({
    mutationFn: (newUser: NewUser) => authService.register(newUser),
  });
}
