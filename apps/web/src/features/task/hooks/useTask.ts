import { useMutation, useQueryClient } from '@tanstack/react-query';
import { taskService } from '@/features/task/service/task';
import type { NewTask } from '@taskmeup/shared';
import { queryKeys } from '@/lib/query-keys';

export function useCreateNewTask(workspaceId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newTask: NewTask) => taskService.createNewTask(newTask),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.task.list(workspaceId),
      });
    },
  });
}
