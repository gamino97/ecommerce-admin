import { createClient } from '@/utils/supabase/server';
import { type Customer } from '@/entities/customer';

export async function getCustomers() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('users_with_orders')
    .select(`
      id,
      first_name,
      last_name,
      created_at
    `)
    .order('created_at', { ascending: false })
    .overrideTypes<Array<{ id: string }>>();
  if (error) throw error;
  return data;
}

export function getFullName(user: Partial<Customer>){
  return `${user.first_name || ''} ${user.last_name || ''}`;
}
