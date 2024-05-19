import { Profile } from '@models/account/profile.model';
import { Role } from './role.model';
import { RoleEntity } from './role-entity.model';
import { UserWhosale } from './whosale.model';

export interface User {
  id: string;
  name?: string | null;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  emailVerifiedAt: null;
  emailConfirmedAt?: Date;
  rememberToken: string;
  updatedAt: Date;
  createdAt: Date;
  roles: RoleEntity[];
  deletedAt: null;
  profile?: Profile;
  userId?: string;
  roleNames: string[];
  data: [];
  medias?: number;
  apiBalanceValue?: number;
  wholesaleUsers?: UserWhosale;
  getTotalPurchaseValue?: number;
  getTotalOrders?: number;

}
