export const queryKeys = {
  user: {
    current: () => ['currentUser'] as const,
  },

  workspace: {
    all: () => ['workspace'] as const,
    detail: (workspaceId: string) =>
      [queryKeys.workspace.all, workspaceId] as const,
    list: () => ['workspace-list'] as const,
  },

  task: {
    all: () => ['tasks'] as const,
    list: (workspaceId: string) => [queryKeys.task.all, workspaceId] as const,
    detail: (workspaceId: string, taskId: string) =>
      [queryKeys.workspace.all, workspaceId, taskId] as const,
  },
} as const;
