import { User } from '@models/account/user.model';

// resident -> member
export interface Member extends User {
  companyName: string;
  companyId: string;
}
