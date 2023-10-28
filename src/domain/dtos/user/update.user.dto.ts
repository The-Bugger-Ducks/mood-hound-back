import { IsString, IsNotEmpty, MinLength, IsOptional } from 'class-validator';

export class UpdateUserDto {
	@IsOptional()
	@IsString()
	@IsNotEmpty()
	name: string;

	@IsOptional()
	@IsString()
	@IsNotEmpty()
	@MinLength(8)
	password: string;
}
