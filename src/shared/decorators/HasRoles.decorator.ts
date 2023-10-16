import { SetMetadata } from '@nestjs/common';

import { UserRoleEnum } from '../../domain/entities';

export const HAS_ROLES_KEY = 'HAS_ROLES';

export const HasRoles = (...roles: Array<keyof typeof UserRoleEnum>) => {
	return SetMetadata(HAS_ROLES_KEY, roles);
};
