import z from 'zod';

export const NewWorkspaceSchema = z.object({
  workspaceName: z
    .string()
    .min(1, 'Workspace name is required')
    .max(100, 'Workspace name must not exceed 100 characters')
    .trim(),
});
