import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { getCustomers } from '@/services/customers';

export const metadata = {
  title: 'Customers',
  description: 'Manage your customers',
};

interface DataTableProps {
  data: Awaited<ReturnType<typeof getCustomers>>;
}

function DataTable({ data }: DataTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Member Since</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((customer) => (
          <TableRow key={customer.id}>
            <TableCell className="font-medium">
              {customer.id}
            </TableCell>
            <TableCell className="font-medium">
              {customer.first_name} {customer.last_name}
            </TableCell>
            <TableCell>
              {new Date(customer.created_at!).toLocaleDateString()}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default async function CustomersPage() {
  const customers = await getCustomers();
  return (
    <div className="w-full mx-auto py-10 px-5">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Customers</h1>
          <p className="text-muted-foreground">
            Manage your customers and their information
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/customers/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Customer
          </Link>
        </Button>
      </div>
      <div className="rounded-md border">
        <DataTable data={customers} />
      </div>
    </div>
  );
}
