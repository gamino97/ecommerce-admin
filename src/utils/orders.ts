import Decimal from 'decimal.js';
import { Product } from '@/entities/product';

export function getItemOrderSubtotal(
  {product, quantity}: {product: Product, quantity: number}) {
  return Decimal(product.price).mul(quantity).toNumber();
}
