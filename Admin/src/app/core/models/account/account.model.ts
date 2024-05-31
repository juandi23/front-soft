import { User } from './user.model';

export interface Account {
  plainTextToken: string;
  user: User;
  authToken: string;
}
