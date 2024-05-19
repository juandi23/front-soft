import { Product } from "./product.model";
import { User } from "@models/account/user.model";

export interface ProductComment {
  id?: string;
  content: string;
  user: User;
  parentComment?: ProductComment;
  reply?: ProductComment;
  replies?: ProductComment[];
  product?: Product;
  createdAt?: string;
  deletedAt?: string;
}
