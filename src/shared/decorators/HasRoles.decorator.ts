import { SetMetadata } from '@nestjs/common';

import { RoleEnum } from 'src/modules/users/entities/users.entity';

export const HAS_ROLES_KEY = 'HAS_ROLES';

export const HasRoles = (...roles: Array<keyof typeof RoleEnum>) => {
	return SetMetadata(HAS_ROLES_KEY, roles);
};
