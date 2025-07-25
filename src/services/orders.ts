import { createClient } from '@/utils/supabase/server';

const LOW_STOCK_THRESHOLD = 30;

async function getOrders() {
  const supabase = await createClient();
  const { data: orders } = await supabase.from('orders').select('*');

  return orders;
}

async function countOrders(): Promise<number> {
  const supabase = await createClient();
  const { count } = await supabase.from('orders').select('*', { count: 'exact' });

  return count || 0;
}

async function getTotalSalesPrice(): Promise<number> {
  const supabase = await createClient();
  const { data } = await supabase.from('orders').select('order_items(*)');
  const totalSalesPrice = data?.reduce(
    (total, order) => total + order.order_items.reduce(
      (itemTotal, item) => itemTotal + item.price * item.quantity,
      0
    ),
    0
  ) || 0;
  return totalSalesPrice;
}

async function getLowStockItems(): Promise<number> {
  const supabase = await createClient();
  const { data } = await supabase.from('products').select('*');
  const lowStockItems = data?.filter(
    product => product.stock < LOW_STOCK_THRESHOLD).length || 0;
  return lowStockItems;
}

async function getCustomers(): Promise<number> {
  const supabase = await createClient();
  const { count } = await supabase.from('profiles').select('*', { count: 'exact' });
  return count || 0;
}

export {
  getOrders,
  countOrders,
  getTotalSalesPrice,
  getLowStockItems,
  getCustomers
};
