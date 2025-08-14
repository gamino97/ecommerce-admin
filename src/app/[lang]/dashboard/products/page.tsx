import { Button } from '@/components/ui/button';
import { Edit, Plus } from 'lucide-react';
import Link from 'next/link';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { getProducts } from '@/services/products';
import Image from 'next/image';

export const metadata = {
  title: 'Products',
  description: 'Manage your products',
};

interface DataTableProps {
  data: Awaited<ReturnType<typeof getProducts>>;
}

function DataTable({ data }: DataTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Image</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Stock</TableHead>
          <TableHead>Sold</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((product) => (
          <TableRow key={product.id}>
            <TableCell className="w-16">
              <Image
                src={product.image_url}
                alt={product.name}
                width={44}
                height={44}
              />
            </TableCell>
            <TableCell className="font-medium">{product.name}</TableCell>
            <TableCell>{product.description}</TableCell>
            <TableCell>{product.price}</TableCell>
            <TableCell>{product.stock}</TableCell>
            <TableCell>{product.order_items[0].count}</TableCell>
            <TableCell className="w-24">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                asChild
              >
                <Link href={`/dashboard/products/${product.id}/edit`}>
                  <Edit className="h-4 w-4" />
                </Link>
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default async function ProductsPage() {
  const products = await getProducts();
  return (
    <div className="w-full mx-auto py-10 px-5">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Products</h1>
          <p className="text-muted-foreground">
            Manage your products and inventory
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/products/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Product
          </Link>
        </Button>
      </div>
      <div className="rounded-md border">
        <DataTable data={products} />
      </div>
    </div>
  );
}
