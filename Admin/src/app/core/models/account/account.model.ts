import { User } from './user.model';

export interface Account {
  accessToken: {
    name: string;
    abilities: string[];
    tokenable_id: string;
    tokenable_type: string;
    updatedAt: Date;
    createdAt: Date;
    id: number;
  };
  plainTextToken: string;
  user: User;
}
