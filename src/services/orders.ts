import { createClient } from '@/utils/supabase/server';
import { getOrderTotal } from '@/lib/orders';
import Decimal from 'decimal.js';
import { ArrayElement } from '@/entities';

const LOW_STOCK_THRESHOLD = 30;

export async function getOrders() {
  const supabase = await createClient();
  const { data: orders } = await supabase.from('orders').select('*, profiles(first_name, last_name), order_items(product_id, quantity, products(*))');
  return orders || [];
}

export type OrderWithProfilesAndItems =
  ArrayElement<Awaited<ReturnType<typeof getOrders>>>;

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
