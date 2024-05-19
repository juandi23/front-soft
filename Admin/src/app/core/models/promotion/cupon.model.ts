import { Category } from "@models/categories/category.model";
import { Product } from "@models/products/product.model";

export interface CuponModel {
    id: string;
    discount: number;
    code: string;
    availableQuantity?: number;
    expirationDate?: string | null;
    products?:  Product[];
    categories?: Category[];
}

