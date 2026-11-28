import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { workspaceService } from '@/features/workspace/service/workspace';
import { queryKeys } from '@/lib/query-keys';

export function useCreateNewWorkspace() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (workspaceName: string) =>
      workspaceService.createNewWorkspace(workspaceName),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: queryKeys.workspace.list() }),
  });
}

export function useGetWorkspaceDetails(workspaceId: string) {
  return useQuery({
    queryKey: queryKeys.workspace.detail(workspaceId),
    queryFn: () => workspaceService.getWorkspaceDetails(workspaceId),
  });
}

export function useGetWorkspaces() {
  return useQuery({
    queryKey: queryKeys.workspace.list(),
    queryFn: () => workspaceService.getWorkspaces(),
  });
}

export function useGetWorkspaceMembers(
  workspaceId: string,
  currentTab: string,
) {
  return useQuery({
    queryKey: queryKeys.workspace.members(workspaceId),
    queryFn: () => workspaceService.getWorkspaceMembers(workspaceId),
    enabled: currentTab === 'tasks' || currentTab === 'members',
  });
}
