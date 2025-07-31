import Decimal from 'decimal.js';
import { Product } from '@/entities/product';
import { Order } from '@/entities/order';
import { getOrders } from '@/services/orders';

export function getItemOrderSubtotal(
  { product, quantity }: { product: Product, quantity: number }) {
  return Decimal(product.price).mul(quantity);
}

type ArrayElement<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

export function getOrderTotal(
  { items, products }: { items: ArrayElement<Awaited<ReturnType<typeof getOrders>>>['order_items'], products: Product[] }) {
  return items.reduce((total: Decimal, item) => {
    let product: Product | undefined;
    if (item.products){
      product = item.products;
    } else {
      product = products.find(p => p.id === item.productId);
    }
    if (!product) return total;
    return Decimal(total).add(getItemOrderSubtotal({
      product, quantity: item.quantity
    }));
  }, Decimal(0));
}

export function getOrderTotalText(
  { items, products }: { items: Order['items'], products: Product[] }) {
  return Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(getOrderTotal({ items, products }).toNumber());
}
