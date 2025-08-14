import { createClient } from '@/utils/supabase/server';

export type Category = {
  id: string;
  name: string;
};

async function getCategories(): Promise<Category[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('name', { ascending: true });
  if (error) throw error;
  return data || [];
}

export { getCategories };
