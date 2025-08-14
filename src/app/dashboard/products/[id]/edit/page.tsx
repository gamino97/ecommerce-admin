import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { getCategories } from '@/services/categories';
import { getProductById } from '@/services/products';
import EditProductForm from './form';
import { notFound } from 'next/navigation';

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [categories, product] = await Promise.all([
    getCategories(),
    getProductById(id),
  ]);
  if (!product) return notFound();
  return (
    <div className="container mx-auto py-10">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>Edit Product</CardTitle>
          <CardDescription>Update product details.</CardDescription>
        </CardHeader>
        <EditProductForm
          categories={categories}
          product={product}
        />
      </Card>
    </div>
  );
}
