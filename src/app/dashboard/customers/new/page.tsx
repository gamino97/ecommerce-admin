import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import NewCustomerForm from './form';

export const metadata = {
  title: 'Create Customer',
  description: 'Add a new customer',
};

export default function NewCustomerPage() {

  return (
    <div className="container mx-auto py-10">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Add New Customer</CardTitle>
          <CardDescription>Create a new customer account</CardDescription>
        </CardHeader>
        <NewCustomerForm />
      </Card>
    </div>
  );
}
