'use server';

import {
  productInsertSchema,
  ProductInsert,
} from '@/entities/product';
import { createProduct } from '@/services/products';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export type ActionErrors = Record<string, { message: string }>;

export async function saveProduct(
  values: ProductInsert,
): Promise<{ errors?: ActionErrors }> {
  // Validate input
  const parsed = productInsertSchema.safeParse(values);
  if (!parsed.success) {
    const errors: ActionErrors = {};
    for (const issue of parsed.error.issues) {
      errors[issue.path.join('.')] = { message: issue.message };
    }
    return { errors };
  }

  const newProduct = await createProduct(values);
  if (!newProduct) {
    return {
      errors: {
        root: { message: 'Failed to create product' },
      },
    };
  }
  // Revalidate list and redirect
  revalidatePath('/dashboard/products', 'page');
  redirect('/dashboard/products');
}
