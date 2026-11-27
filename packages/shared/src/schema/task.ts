import z from 'zod';

export const NewTaskSchema = z.object({
  workspaceId: z.string().trim(),
  taskName: z
    .string()
    .min(1, 'Task name is required')
    .max(50, 'Task name must not exceed 50 characters')
    .trim(),
  taskDescription: z.string().min(1, 'Task Description is required').trim(),
  status: z.enum(['todo', 'ongoing', 'review', 'cancelled']),
  priority: z.enum(['low', 'medium', 'high']),
  dueDate: z.iso.datetime({ offset: true }).nullable(),
});

export type NewTask = z.infer<typeof NewTaskSchema>;
