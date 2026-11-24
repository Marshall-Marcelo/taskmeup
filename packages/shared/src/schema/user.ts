import z from 'zod';

export const NewUserSchema = z.object({
  firstName: z
    .string()
    .min(1, 'First name is required')
    .max(50, 'First name must not exceed 50 characters')
    .regex(/^[^0-9]*$/, 'First name must not contain numbers')
    .trim(),
  lastName: z
    .string()
    .min(1, 'Last name is required')
    .max(50, 'Last name must not exceed 50 characters')
    .regex(/^[^0-9]*$/, 'Last name must not contain numbers')
    .trim(),
  email: z
    .email('Invalid email address')
    .max(255, 'Email must not exceed 255 characters')
    .trim(),
  password: z
    .string()
    .min(12, 'Password must contain at least 12 characters')
    .max(72, 'Password is too long')
    .trim(),
});

export const LoginSchema = z.object({
  email: z
    .email('Invalid email address')
    .max(255, 'Email must not exceed 255 characters')
    .trim(),
  password: z
    .string()
    .min(12, 'Password must contain at least 12 characters')
    .max(72, 'Password is too long')
    .trim(),
});

export type NewUser = z.infer<typeof NewUserSchema>;
export type LoginCredentials = z.infer<typeof LoginSchema>;
