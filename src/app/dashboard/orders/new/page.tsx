import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { getCustomers } from '@/services/customers';
import { getProducts } from '@/services/products';
import NewOrderForm from './form';

export const metadata = {
  title: 'Create Order',
  description: 'Add a new order',
};

export default async function NewOrderPage() {
  const customers = await getCustomers();
  const products = await getProducts();
  return (
    <div className="container mx-auto py-10">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Create New Order</CardTitle>
          <CardDescription>
            Fill out the form to create a new order.
          </CardDescription>
        </CardHeader>
        <NewOrderForm
          customers={customers}
          products={products}/>
      </Card>
    </div>
  );
}
