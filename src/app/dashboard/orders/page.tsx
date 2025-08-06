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
import { Badge } from '@/components/ui/badge';
import { getOrders } from '@/services/orders';
import { getOrderTotalText } from '@/lib/orders';

export const metadata = {
  title: 'Orders',
  description: 'View and manage orders',
};

function getStatusBadgeVariant(status: string) {
  switch (status) {
    case 'completed':
      return 'default';
    case 'pending':
      return 'destructive';
    default:
      return 'secondary';
  }
}

function DataTable({ data }: { data: Awaited<ReturnType<typeof getOrders>> }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Order #</TableHead>
          <TableHead>Customer</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Total</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="w-24">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((order) => (
          <TableRow key={order.id}>
            <TableCell className="font-mono text-sm">
              {order.order_number}
            </TableCell>
            <TableCell>
              {order.profiles?.first_name} {order.profiles?.last_name}
            </TableCell>
            <TableCell>
              {order.created_at
                ? new Date(order.created_at).toLocaleDateString()
                : 'N/A'}
            </TableCell>
            <TableCell>
              {getOrderTotalText({ items: order.order_items })}
            </TableCell>
            <TableCell>
              <Badge variant={getStatusBadgeVariant(order.status)}>
                {order.status}
              </Badge>
            </TableCell>
            <TableCell>
              <Button variant="outline" size="sm" asChild>
                <Link href={`/dashboard/orders/${order.id}`}>View</Link>
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default async function OrdersPage() {
  const orders = await getOrders();
  return (
    <div className="w-full mx-auto py-10 px-5">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Orders</h1>
          <p className="text-muted-foreground">
            View and manage customer orders
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/orders/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Order
          </Link>
        </Button>
      </div>
      <div className="rounded-md border">
        {orders && orders.length > 0 ? (
          <DataTable data={orders} />
        ) : (
          <div className="p-8 text-center text-muted-foreground">
            No orders found. Create your first order to get started.
          </div>
        )}
      </div>
    </div>
  );
}
