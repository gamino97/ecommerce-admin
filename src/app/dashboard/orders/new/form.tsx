'use client';
import { useEffect, useMemo } from 'react';
import { Control, useController, useWatch } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { useForm, useFieldArray, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Order,
  orderSchema,
  defaultOrderValues,
} from '@/entities/order';
import { Product } from '@/entities/product';
import { createOrder } from './actions';
import Link from 'next/link';
import { getCustomers } from '@/services/customers';
import { getProducts } from '@/services/products';
import { getItemOrderSubtotal, getOrderTotal } from '@/lib/orders';

export default function NewOrderForm({
  customers,
  products,
}: {
  customers: Awaited<ReturnType<typeof getCustomers>>;
  products: Awaited<ReturnType<typeof getProducts>>;
}) {
  const form = useForm<Order>({
    resolver: zodResolver(orderSchema),
    defaultValues: defaultOrderValues,
  });
  const {
    handleSubmit,
    control,
    setError,
    formState: { isSubmitting },
  } = form;
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  });
  const onSubmit: SubmitHandler<Order> = async (data) => {
    try {
      const result = await createOrder(data);
      if (result?.errors) {
        Object.entries(result.errors).forEach(([key, value]) => {
          if (value && typeof value === 'object' && 'message' in value) {
            setError(key as keyof Order, {
              message: String(value.message),
            });
          }
        });
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Form {...form}>
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-6">
          <FormField
            control={control}
            name="customerId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Customer</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a customer" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {customers.map(
                      (customer) => (
                        <SelectItem
                          key={customer.id}
                          value={customer.id}
                        >
                          {customer.first_name} {customer.last_name}
                        </SelectItem>
                      ),
                    )}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <div>
            <h3 className="text-lg font-medium">Order Items</h3>
            <div className="space-y-4 mt-2">
              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="flex items-center space-x-4 p-4 border rounded-lg"
                >
                  <FormField
                    control={control}
                    name={`items.${index}.productId`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a product" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {products.map((product: Product) => (
                              <SelectItem
                                key={product.id}
                                value={product.id}
                              >
                                {product.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={control}
                    name={`items.${index}.quantity`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Qty"
                            {...field}
                            onChange={(event) => field.onChange(
                              event.target.valueAsNumber
                            )}
                            min={1}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <PriceField
                    control={control}
                    index={index}
                    products={products}
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() => remove(index)}
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
            <FormField
              control={control}
              name="items"
              render={() => (
                <FormMessage className='mt-2' />
              )}
            />
            <div className="flex justify-between items-start mt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() =>
                  append({
                    productId: '',
                    productName: '',
                    quantity: 1,
                  })
                }
              >
                Add Item
              </Button>
              <OrderTotal products={products}/>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between items-end">
          <Button
            type="button"
            variant="outline"
            asChild
            disabled={isSubmitting}
          >
            <Link href="/dashboard/orders">Cancel</Link>
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Creating...' : 'Create Order'}
          </Button>
        </CardFooter>
      </form>
    </Form>
  );
}

function PriceField({
  control,
  index,
  products,
}: {
  control: Control<Order>;
  index: number;
  products: Awaited<ReturnType<typeof getProducts>>;
}) {
  const selectedProductId = useWatch({
    control,
    name: `items.${index}.productId`,
  });
  const selectedQuantity = useWatch({
    control,
    name: `items.${index}.quantity`,
  });
  
  const selectedProduct = products.find(p => p.id === selectedProductId);
  const { field } = useController({
    control,
    name: `items.${index}.price`,
  });

  // Update the price when product changes
  useEffect(() => {
    if (selectedProduct) {
      field.onChange(getItemOrderSubtotal({
        product: selectedProduct,
        quantity: selectedQuantity
      }).toNumber());
    }
  }, [selectedProductId, field, selectedProduct, selectedQuantity]);

  return (
    <FormItem>
      <FormControl>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <span className="text-muted-foreground">$</span>
          </div>
          <Input
            type="number"
            placeholder="Price"
            {...field}
            value={field.value || ''}
            readOnly
            className="bg-muted pl-7"
          />
        </div>
      </FormControl>
      <FormMessage />
    </FormItem>
  );
}

function OrderTotal(
  { products }:{ products: Awaited<ReturnType<typeof getProducts>> }
) {
  const items = useWatch({ name: 'items' }) as Order['items'];
  // Calculate order total
  const orderTotal = useMemo(
    () => getOrderTotal({ items, products }),
    [items, products]
  );
  return (
    <div className="flex justify-between items-center p-4 bg-muted/50 rounded-lg">
      <span className="font-medium mr-[1ch]">Order Total:</span>
      <span className="text-lg font-semibold">
        {Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(orderTotal.toNumber())}
      </span>
    </div>
  );
}
