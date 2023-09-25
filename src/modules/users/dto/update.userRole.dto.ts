import { IsEnum, IsMongoId, IsNotEmpty, IsUppercase } from 'class-validator';

import { RoleEnum } from '../entities/users.entity';

export class UpdateUserRoleDto {
	@IsNotEmpty()
	@IsMongoId()
	userId: string;

	@IsNotEmpty()
	@IsUppercase()
	@IsEnum(RoleEnum)
	role: RoleEnum;
}
