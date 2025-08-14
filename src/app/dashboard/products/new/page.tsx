import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { getCategories } from '@/services/categories';
import NewProductForm from './form';

export const metadata = {
  title: 'Create Product',
  description: 'Add a new product',
};

export default async function NewProductPage() {
  const categories = await getCategories();
  return (
    <div className="container mx-auto py-10">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>Create Product</CardTitle>
          <CardDescription>
            Fill out the form to add a new product.
          </CardDescription>
        </CardHeader>
        <NewProductForm categories={categories} />
      </Card>
    </div>
  );
}
