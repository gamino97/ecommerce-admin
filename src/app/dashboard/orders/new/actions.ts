'use server';

import { orderSchema, OrderValidator } from '@/entities/order';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createOrder } from '@/services/orders';

type ActionState = {
  errors: Record<string, { message: string }>;
};

export async function createOrderAction(data: OrderValidator) {
  const { error: parseError } = orderSchema.safeParse(data);
  const errors: ActionState['errors'] = {};
  for (const { path, message } of parseError?.issues || []) {
    errors[path.join('.')] = { message };
  }
  if(Object.keys(errors).length > 0) {
    return {
      errors,
    };
  }
  await createOrder(data);
  revalidatePath('/dashboard/orders', 'page');
  redirect('/dashboard/orders');
}
