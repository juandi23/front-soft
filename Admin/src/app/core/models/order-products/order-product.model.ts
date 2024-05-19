import { Color } from "@models/products/product-color.model";
import { Order } from "@models/orders/order.model";
import { Product } from "@models/products/product.model";
import { Size } from "@models/products/product-size.model";

export interface OrderProduct {
  id?: string;
  product?: Product;
  size?: Size;
  color?: Color;

  order?: Order;
  quantity: number;

}

