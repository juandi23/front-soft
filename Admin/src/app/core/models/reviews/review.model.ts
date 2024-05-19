import { User } from "@models/account/user.model";

export interface Review {
  id: string;
  title: string;
  content: string;
  valoration: number;
  user: User;
  createdAt: string;
  deletedAt?: string;
}

