// Validators - Profile
import * as z from 'zod';

const emailValidator = z.string({ required_error: 'Email is required' }).email({
  message: 'Please enter a valid email address',
});

export const profileSchema = z.object({
  firstName: z.string().min(1, { message: 'First name is required' }),
  lastName: z.string().min(1, { message: 'Last name is required' }),

  email: emailValidator,
});
