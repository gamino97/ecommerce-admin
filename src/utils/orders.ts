import Decimal from 'decimal.js';
import { Product } from '@/entities/product';
import { Order } from '@/entities/order';

export function getItemOrderSubtotal(
  { product, quantity }: { product: Product, quantity: number }) {
  return Decimal(product.price).mul(quantity);
}

export function getOrderTotal(
  { items, products }: { items: Order['items'], products: Product[] }) {
  return items.reduce((total: Decimal, item) => {
    const product = products.find(p => p.id === item.productId);
    if (!product) return total;
    return Decimal(total).add(getItemOrderSubtotal({
      product, quantity: item.quantity
    }));
  }, Decimal(0));
}
