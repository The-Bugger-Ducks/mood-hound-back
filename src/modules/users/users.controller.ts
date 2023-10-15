import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	HttpStatus,
	Param,
	Post,
	Put,
	Query,
} from '@nestjs/common';

import { ApiQuery, ApiTags } from '@nestjs/swagger';

import { UsersService } from './users.service';

import { ActiveUserId } from '../../shared/decorators/ActiveUserId.decorator';

import { OptionalParseEnumPipe } from '../../shared/pipes/OptionalParseEnumPipe';

import { UserRoleEnum } from '../../domain/entities/user.entity';

import {
	CreateUserDto,
	UpdateUserDto,
	UpdateUserRoleDto,
} from '../../domain/dtos';
import { ParseObjectIDPipe } from '../../shared/pipes/ParseObjectIDPipe';

@Controller('users')
@ApiTags('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) { }

	@Get('/me')
	me(@ActiveUserId() userId: string) {
		return this.usersService.getUserById(userId);
	}

	@Get('/search')
	@ApiQuery({ name: 'role', enum: UserRoleEnum, required: false })
	@ApiQuery({ name: 'name', required: false })
	@ApiQuery({ name: 'email', required: false })
	search(
		@ActiveUserId() userId: string,
		@Query('name') name?: string,
		@Query('email') email?: string,
		@Query('role', new OptionalParseEnumPipe(UserRoleEnum)) role?: UserRoleEnum,
	) {
		console.log('\n\n\n\n\n\n', userId, '\n\n\n\n\n',);

		return this.usersService.search(userId, {
			name,
			email,
			role,
		});
	}

	@Post()
	create(@Body() createUserDto: CreateUserDto) {
		return this.usersService.create(createUserDto);
	}

	@Put()
	@HttpCode(HttpStatus.NO_CONTENT)
	update(@ActiveUserId() userId: string, @Body() updateUserDto: UpdateUserDto) {
		return this.usersService.update(userId, updateUserDto);
	}

	@Put('/role')
	@HttpCode(HttpStatus.NO_CONTENT)
	manageRole(@Body() updateUserRoleDto: UpdateUserRoleDto) {
		return this.usersService.updateRole(updateUserRoleDto);
	}

	@Delete(':id')
	@HttpCode(HttpStatus.NO_CONTENT)
	delete(@Param('id', ParseObjectIDPipe) userId: string) {
		return this.usersService.remove(userId);
	}
}
