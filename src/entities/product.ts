import { z } from 'zod';

export const productSchema = z.object({
  id: z.uuid(),
  name: z.string().min(1, { message: 'Name is required' }),
  description: z.string().optional(),
  image_url: z.url({ message: 'Image URL must be valid' }).optional(),
  price: z.number({ message: 'Price is required' }).positive({ message: 'Price must be positive' }),
  stock: z.number({ message: 'Stock is required' }).int().nonnegative({ message: 'Stock must be 0 or more' }),
  category_id: z.string({ message: 'Category is required' }),
});

// Schema for creating/updating (no id)
export const productInsertSchema = productSchema.omit({ id: true });

export type Product = z.infer<typeof productSchema>;
export type ProductInsert = z.infer<typeof productInsertSchema>;

export const defaultProductValues: ProductInsert = {
  name: '',
  description: '',
  image_url: '',
  price: 0,
  stock: 0,
  category_id: '',
};
