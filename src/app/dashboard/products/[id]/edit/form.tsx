'use client';

import { ProductInsert, Product } from '@/entities/product';
import { Category } from '@/services/categories';
import { ProductForm } from '@/components/product-form';
import { updateProductAction } from './actions';

export default function EditProductForm({
  categories,
  product,
}: {
  categories: Category[];
  product: Product;
}) {
  async function handleSubmit(values: ProductInsert) {
    await updateProductAction(product.id, values);
  }
  return (
    <ProductForm
      categories={categories}
      initialValues={{
        name: product.name,
        description: product.description ?? '',
        image_url: product.image_url ?? '',
        price: product.price,
        stock: product.stock,
        category_id: product.category_id,
      }}
      onSubmit={handleSubmit}
    />
  );
}
