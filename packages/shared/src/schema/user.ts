import z from 'zod';

export const NewUserSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, 'First name is required')
    .max(50, 'First name must not exceed 50 characters'),
  lastName: z
    .string()
    .trim()
    .min(1, 'Last name is required')
    .max(50, 'Last name must not exceed 50 characters'),
  email: z
    .email('Invalid email address')
    .trim()
    .max(255, 'Email must not exceed 255 characters'),
  password: z
    .string()
    .trim()
    .min(12, 'Password must contain at least 12 characters')
    .max(72, 'Password is too long'),
});

export type NewUser = z.infer<typeof NewUserSchema>;
