'use server';

import { orderSchema, Order, type OrderStatus, orderStatuses } from '@/entities/order';
import { createClient } from '@/utils/supabase/server';
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
  const { error } = await supabase.from('orders').insert(values);
  if(error) {
    return {
      errors: {
        customerId: { message: error.message },
      },
    };
  }
  console.log('Creating order:', data);
  return { errors: null };
}
