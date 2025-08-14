'use server';

import {
  productInsertSchema,
  ProductInsert,
} from '@/entities/product';
import { updateProduct } from '@/services/products';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export type ActionErrors = Record<string, { message: string }>;

export async function updateProductAction(
  id: string,
  values: ProductInsert,
): Promise<{ errors?: ActionErrors }> {
  const parsed = productInsertSchema.safeParse(values);
  if (!parsed.success) {
    const errors: ActionErrors = {};
    for (const issue of parsed.error.issues) {
      errors[issue.path.join('.')] = { message: issue.message };
    }
    return { errors };
  }

  const product = await updateProduct(id, values);
  if (!product) {
    return {
      errors: { root: { message: 'Failed to update product' } },
    };
  }
  revalidatePath('/dashboard/products', 'page');
  redirect('/dashboard/products');
}
