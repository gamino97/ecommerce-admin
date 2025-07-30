'use server';

import { Order } from '@/entities/order';

export async function createOrder(data: Order) {
  console.log('Creating order:', data);

  // Here you would typically interact with your database or API
  // For now, we'll just simulate a successful creation

  await new Promise(resolve => setTimeout(resolve, 1000));

  return { errors: null };
}
