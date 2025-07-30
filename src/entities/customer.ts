import { z } from 'zod';

export const schema = z.object({
  id: z.string().optional(),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
});

export type Customer = z.infer<typeof schema>;
