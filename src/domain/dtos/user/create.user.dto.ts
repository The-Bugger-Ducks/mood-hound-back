import {
	IsEmail,
	IsEnum,
	IsNotEmpty,
	IsString,
	MinLength,
} from 'class-validator';

import { UserRoleEnum } from '../../../domain/entities/user.entity';

export class CreateUserDto {
	@IsString()
	@IsNotEmpty()
	name: string;

	@IsString()
	@IsNotEmpty()
	@IsEmail()
	email: string;

	@IsString()
	@IsNotEmpty()
	@MinLength(8)
	password: string;

	@IsNotEmpty()
	@IsEnum(UserRoleEnum)
	role: UserRoleEnum;
}
