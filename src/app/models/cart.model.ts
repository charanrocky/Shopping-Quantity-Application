import { Product } from './product.model';

export type CartItem = {
  product: Product;
  quantity: number;
};
