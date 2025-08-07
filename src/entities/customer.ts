import { z } from 'zod';
import { Tables } from '@/utils/supabase/database.types';

export const schema = z.object({
  id: z.string().optional(),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
});

export type CustomerValidator = z.infer<typeof schema>;

export type Customer = Tables<'profiles'>;
