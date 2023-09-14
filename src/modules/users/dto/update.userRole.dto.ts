import { IsEnum, IsNotEmpty, IsUUID, IsUppercase } from 'class-validator';

import { RoleEnum } from '../entities/users.entity';

export class UpdateUserRoleDto {
	@IsNotEmpty()
	@IsUUID()
	userId: string;

	@IsNotEmpty()
	@IsUppercase()
	@IsEnum(RoleEnum)
	role: RoleEnum;
}
