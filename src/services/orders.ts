import { createClient } from '@/utils/supabase/server';
import { getOrderTotal } from '@/lib/orders';
import Decimal from 'decimal.js';
import { ArrayElement } from '@/entities';
import { Order, orderStatuses } from '@/entities/order';

const LOW_STOCK_THRESHOLD = 30;

export async function getOrders() {
  const supabase = await createClient();
  const { data: orders } = await supabase.from('orders').select('*, profiles(first_name, last_name), order_items(product_id, quantity, products(*))');
  return orders || [];
}

export type OrderWithProfilesAndItems =
  ArrayElement<Awaited<ReturnType<typeof getOrders>>>;

export async function getOrder(id: string) {
  const supabase = await createClient();
  const { data: order } = await supabase
    .from('orders')
    .select('*, profiles(first_name, last_name), order_items(id, product_id, quantity, products(*))')
    .eq('id', id)
    .single();
  return order;
}

export async function countOrders(): Promise<number> {
  const supabase = await createClient();
  const { count } = await supabase.from('orders').select('*', { count: 'exact' });

  return count || 0;
}

export async function getTotalSalesPrice(): Promise<number> {
  const supabase = await createClient();
  const { data } = await supabase.from('orders').select('order_items(*, products(*))');
  const totalSalesPrice = data?.reduce(
    (total, order) => Decimal(total).add(getOrderTotal({
      items: order.order_items
    })),
    Decimal(0)
  ) || Decimal(0);
  return totalSalesPrice.toNumber();
}

export async function getLowStockItems(): Promise<number> {
  const supabase = await createClient();
  const { data } = await supabase.from('products').select('*');
  const lowStockItems = data?.filter(
    product => product.stock < LOW_STOCK_THRESHOLD).length || 0;
  return lowStockItems;
}

export async function getCustomers(): Promise<number> {
  const supabase = await createClient();
  const { count } = await supabase.from('profiles').select('*', { count: 'exact' });
  return count || 0;
}

export async function createOrder(order: Order) {
  const values = {
    profiles_id: String(order.customerId || ''),
    status: orderStatuses[0],
    shipping_address: 'Shipping Address',
  };
  const supabase = await createClient();
  const { error, data: newOrder } = await supabase
    .from('orders')
    .insert(values)
    .select()
    .single();
  if(error) throw error;
  const { error: insertError } = await supabase
    .from('order_items')
    .insert(
      order.items.map(item => ({
        order_id: newOrder.id,
        product_id: item.product_id,
        quantity: item.quantity,
      })));
  if(insertError) throw insertError;
  // Decrement stock for all products in the order
  const { error: stockError } = await supabase.rpc('decrement_stock_for_order', {
    p_order_id: newOrder.id,
  });
  if (stockError) throw stockError;
}
