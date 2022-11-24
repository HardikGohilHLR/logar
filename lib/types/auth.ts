// Types - Auth
import { z } from 'zod';
import { loginSchema, signupSchema, forgotPasswordSchema, resetPasswordSchema } from '@/lib/validations/auth';

export type ILoginFormValues = z.infer<typeof loginSchema>;

export type ISignupFormValues = z.infer<typeof signupSchema>;

export type IForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

export type IResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;
