// Validators - Auth
import * as z from 'zod';

const emailValidator = z.string({ required_error: 'Email is required' }).email({
  message: 'Please enter a valid email address',
});

const passwordValidator = z
  .string()
  .min(8, { message: 'Password must be at least 8 characters long' })
  .max(100)
  .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/, {
    message: 'Password must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number',
  });

export const loginSchema = z.object({
  email: emailValidator,
  password: passwordValidator,
});

export const signupSchema = loginSchema.extend({
  firstName: z.string().min(1, { message: 'First name is required' }),
  lastName: z.string().min(1, { message: 'Last name is required' }),
});

export const forgotPasswordSchema = z.object({
  email: emailValidator,
});

export const resetPasswordSchema = z
  .object({
    password: passwordValidator,
    confirmPassword: passwordValidator,
    code: z.string().min(6, { message: 'Code must be 6 digits' }).max(6, { message: 'Code must be 6 digits' }),
  })
  .superRefine((val, ctx) => {
    if (val.password !== val.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Password is not the same as confirm password',
        path: ['confirmPassword'],
      });
    }
  });
