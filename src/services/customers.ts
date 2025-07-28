import { createClient } from '@/utils/supabase/server';

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
    .order('created_at', { ascending: false });
  return {data, error};
}
