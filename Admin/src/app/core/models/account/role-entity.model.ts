import { Role } from '@models/account/role.model';

export interface RoleEntity extends Role {
  tenantId?: string | null;
  tenantName?: string | null;
  companyId?: string | null;
  companyName?: string | null;
  modelBotId?: string | null;
  modelBotName?: string | null;
}
