import { IsEnum, IsNotEmpty, IsString, IsUppercase } from 'class-validator';

import { UserRoleEnum } from 'src/domain/entities/user.entity';

export class UpdateUserRoleDto {
	@IsNotEmpty()
	@IsString()
	userId: string;

	@IsNotEmpty()
	@IsUppercase()
	@IsEnum(UserRoleEnum)
	role: UserRoleEnum;
}
