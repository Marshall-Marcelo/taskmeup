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
} as const;
