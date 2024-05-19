import { Color } from "@models/products/product-color.model";
import { Product } from "@models/products/product.model";
import { Size } from "@models/products/product-size.model";

export interface CartProduct {
  id?: string;
  product?: Product;
  size?: Size;
  color?: Color;

  quantity: number;

  productId?: string;
  sizeId?: string;
  colorId?: string;
}

