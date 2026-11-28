export const queryKeys = {
  user: {
    current: () => ['currentUser'] as const,
  },

  workspace: {
    all: () => ['workspace'] as const,

    detail: (workspaceId: string) =>
      [...queryKeys.workspace.all(), workspaceId] as const,

    list: () => [...queryKeys.workspace.all(), 'list'] as const,

    members: (workspaceId: string) =>
      [...queryKeys.workspace.all(), 'members', workspaceId] as const,
  },

  task: {
    all: () => ['tasks'] as const,
    list: (workspaceId: string) =>
      [...queryKeys.task.all(), workspaceId] as const,
    detail: (workspaceId: string, taskId: string) =>
      [...queryKeys.task.all(), workspaceId, taskId] as const,
  },
} as const;
