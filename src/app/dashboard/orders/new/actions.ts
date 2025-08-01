'use server';

import { orderSchema, Order, orderStatuses } from '@/entities/order';
import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

type ActionState = {
  errors: Record<string, { message: string }>;
};

export async function createOrder(data: Order) {
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
  const values = {
    profiles_id: String(data.customerId || ''),
    status: orderStatuses[0],
    shipping_address: 'Shipping Address',
  };
  const supabase = await createClient();
  const { error, data: newOrder } = await supabase.from('orders').insert(values).select().single();
  if(error) throw error;
  const { error: insertError } = await supabase.from('order_items').insert(
    data.items.map(item => ({
      order_id: newOrder.id,
      product_id: item.product_id,
      quantity: item.quantity,
    })));
  if(insertError) throw insertError;
  revalidatePath('/dashboard/orders', 'page');
  redirect('/dashboard/orders');
}
