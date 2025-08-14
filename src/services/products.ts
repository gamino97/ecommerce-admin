import { createClient } from '@/utils/supabase/server';
import { ProductInsert } from '@/entities/product';

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

export async function getProducts() {
  const supabase = await createClient();
  const { data: products, error } = await supabase
    .from('products')
    .select('*, order_items(count)')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return products || [];
}

export async function getProductById(id: string) {
  const supabase = await createClient();
  const { data: product, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();
  if (error) {
    console.error(`Error fetching product with id ${id}:`, error);
    return null;
  }
  return product;
}

export async function createProduct(product: ProductInsert) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('products')
    .insert([product])
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function updateProduct(
  id: string,
  updates: Partial<ProductInsert>
) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('products')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
}
