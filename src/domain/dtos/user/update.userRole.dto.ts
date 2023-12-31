import { IsEnum, IsMongoId, IsNotEmpty, IsUppercase } from 'class-validator';

import { UserRoleEnum } from '../../../domain/entities/user.entity';

export class UpdateUserRoleDto {
	@IsNotEmpty()
	@IsMongoId()
	userId: string;

	@IsNotEmpty()
	@IsUppercase()
	@IsEnum(UserRoleEnum)
	role: UserRoleEnum;
}
