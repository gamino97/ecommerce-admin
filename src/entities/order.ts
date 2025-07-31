import { z } from 'zod';

export const orderStatuses = [
  'pending',
  'shipped',
  'canceled',
] as const;

export type OrderStatus = typeof orderStatuses[number];

export const orderItemSchema = z.object({
  id: z.string().optional(),
  productId: z.string().min(1, 'Product is required'),
  productName: z.string().optional(),
  quantity: z.number().int().positive('Quantity must be at least 1'),
  price: z.number().positive('Price must be greater than 0').optional(),
});

export type OrderItem = z.infer<typeof orderItemSchema>;

export const orderSchema = z.object({
  customerId: z.string({ error: 'Customer is required' }),
  status: z.enum(orderStatuses, {
    error: 'Status is required',
  }),
  items: z
    .array(orderItemSchema)
    .min(1, 'At least one item is required'),
});

export type Order = z.infer<typeof orderSchema>;

export const defaultOrderValues: Partial<Order> = {
  status: 'pending',
  items: [],
};
