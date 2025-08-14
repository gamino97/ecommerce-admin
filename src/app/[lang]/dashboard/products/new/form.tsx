'use client';

import { ProductInsert } from '@/entities/product';
import { Category } from '@/services/categories';
import { ProductForm } from '@/components/product-form';
import { saveProduct } from './actions';

export default function NewProductForm({
  categories,
}: {
  categories: Category[];
}) {

  async function handleSubmit(values: ProductInsert) {
    await saveProduct(values);
  }

  return (
    <ProductForm
      categories={categories}
      onSubmit={handleSubmit}
      initialValues={{}}
    />
  );
}
