'use client';

import { useState } from 'react';
import { ProductInsert } from '@/entities/product';
import { Category } from '@/services/categories';
import { ProductForm } from '@/components/product-form';
import { saveProduct } from './actions';

export default function NewProductForm({
  categories,
}: {
  categories: Category[];
}) {
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, { message: string }>>({});

  async function handleSubmit(values: ProductInsert) {
    setSubmitting(true);
    const result = await saveProduct(values);
    if (result?.errors) {
      setErrors(result.errors);
      setSubmitting(false);
    }
  }

  return (
    <ProductForm
      categories={categories}
      onSubmit={handleSubmit}
      submitting={submitting}
      initialValues={{}}
    />
  );
}
