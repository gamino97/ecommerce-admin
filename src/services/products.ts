import { createClient } from '@/utils/supabase/server';

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  image_url: string;
  created_at: string;
  updated_at: string;
};

type ProductInsert = Omit<Product, 'id' | 'created_at' | 'updated_at'>;

async function getProducts() {
  const supabase = await createClient();
  const { data: products, error } = await supabase
    .from('products')
    .select('*, order_items(count)')
    .order('created_at', { ascending: false });
  if (error) {
    console.error('Error fetching products:', error);
    return [];
  }
  return products || [];
}

export {
  getProducts,
};
