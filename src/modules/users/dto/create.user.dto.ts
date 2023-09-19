import {
	IsEmail,
	IsEnum,
	IsNotEmpty,
	IsString,
	MinLength,
} from 'class-validator';

import { RoleEnum } from '../entities/users.entity';

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
	@IsEnum(RoleEnum)
	role: RoleEnum;
}
