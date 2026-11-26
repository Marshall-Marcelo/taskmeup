import { useMutation, useQuery } from '@tanstack/react-query';
import { workspaceService } from '@/features/workspace/service/workspace';
import { queryKeys } from '@/lib/query-keys';

export function useCreateNewWorkspace() {
  return useMutation({
    mutationFn: (workspaceName: string) =>
      workspaceService.createNewWorkspace(workspaceName),
  });
}

export function useGetWorkspaceDetails(workspaceId: string) {
  return useQuery({
    queryKey: queryKeys.workspace.detail(workspaceId),
    queryFn: () => workspaceService.getWorkspaceDetails(workspaceId),
  });
}
