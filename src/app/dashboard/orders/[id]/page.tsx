import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { getOrder } from '@/services/orders';
import { getOrderTotalText } from '@/lib/orders';
import { notFound } from 'next/navigation';
import Image from 'next/image';

export const metadata = {
  title: 'Order Details',
  description: 'View order information',
};

function OrderStatus({ status }: { status: string }) {
  return <Badge>{status}</Badge>;
}

export default async function OrderPage(
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const order = await getOrder(id);
  if (!order) {
    notFound();
  }
  return (
    <div className="container mx-auto py-10">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Order #{order.order_number}</CardTitle>
          <CardDescription>
            Placed on
            {' '}
            {order.created_at
              ? new Date(order.created_at).toLocaleDateString()
              : 'N/A'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">
                Status
              </h3>
              <OrderStatus status={order.status} />
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">
                Shipping Address
              </h3>
              <p>{order.shipping_address || 'N/A'}</p>
            </div>
          </div>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead></TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead className="text-right">Quantity</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {order.order_items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="w-16">
                      <Image
                        src={item.products?.image_url}
                        alt={item.products?.name}
                        width={44}
                        height={44}
                      />
                    </TableCell>
                    <TableCell>{item.products?.name}</TableCell>
                    <TableCell className="text-right">{item.quantity}</TableCell>
                    <TableCell className="text-right">
                      {item.products ?
                        Intl.NumberFormat('en-US', {
                          style: 'currency',
                          currency: 'USD',
                        }).format(item.products.price) : '-'}
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell colSpan={2} />
                  <TableCell className="font-medium text-right">
                    Total
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    {getOrderTotalText({ items: order.order_items })}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
