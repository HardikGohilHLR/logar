// Types - Profile
import { z } from 'zod';
import { profileSchema } from '@/lib/validations/profile';

export type IProfileFormValues = z.infer<typeof profileSchema>;
