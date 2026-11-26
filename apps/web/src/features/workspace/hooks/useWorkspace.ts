import { useMutation } from '@tanstack/react-query';
import { workspaceService } from '@/features/workspace/service/workspace';

export function useCreateNewWorkspace() {
  return useMutation({
    mutationFn: (workspaceName: string) =>
      workspaceService.createNewWorkspace(workspaceName),
  });
}
