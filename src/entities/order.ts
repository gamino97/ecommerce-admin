import { OrderWithProfilesAndItems } from '@/services/orders';
import { z } from 'zod';
import { ArrayElement, Optional } from '.';

export const orderStatuses = [
  'pending',
  'shipped',
  'canceled',
] as const;

export type OrderStatus = typeof orderStatuses[number];

export const orderItemSchema = z.object({
  id: z.string().optional(),
  product_id: z.uuid({ message: 'Product is required' }),
  quantity: z.number({ message: 'Quantity is required' }).int().positive({ message: 'Quantity must be at least 1' }),
});

export type OrderItem = z.infer<typeof orderItemSchema>;

export const orderSchema = z.object({
  customerId: z.string({ message: 'Customer is required' }),
  status: z.enum(orderStatuses, {
    message: 'Status is required',
  }),
  items: z
    .array(orderItemSchema)
    .min(1, 'At least one item is required'),
});

export type OrderValidator = z.infer<typeof orderSchema>;

export const defaultOrderValues: Partial<OrderValidator> = {
  status: 'pending',
  items: [],
};

type OrderItems = ArrayElement<OrderWithProfilesAndItems['order_items']>;

export type OrderItemPreview = Optional<Pick<OrderItems, 'product_id' | 'quantity' | 'products'>, 'products'>;
