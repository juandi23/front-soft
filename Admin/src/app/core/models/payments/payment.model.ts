import { User } from "@models/account/user.model";

export interface Payment {
  id: string;

  value: number;
  provider: string;
  user: User;

  createdAt: string;
  deletedAt ?: string;
}

