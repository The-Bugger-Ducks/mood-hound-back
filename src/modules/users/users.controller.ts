import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	HttpStatus,
	Param,
	ParseUUIDPipe,
	Post,
	Put,
	Query,
} from '@nestjs/common';

import { ApiQuery, ApiTags } from '@nestjs/swagger';

import { UsersService } from './users.service';

import { ActiveUserId } from 'src/shared/decorators/ActiveUserId.decorator';

import { OptionalParseEnumPipe } from 'src/shared/pipes/OptionalParseEnumPipe';

import { RoleEnum } from './entities/users.entity';

import { CreateUserDto } from './dto/create.user.dto';
import { UpdateUserDto } from './dto/update.user.dto';
import { UpdateUserRoleDto } from './dto/update.userRole.dto';
import { IsPublic } from 'src/shared/decorators/IsPublic.decorator';

@Controller('users')
@ApiTags('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Get('/me')
	me(@ActiveUserId() userId: string) {
		return this.usersService.getUserById(userId);
	}

	@Get('/search')
	@ApiQuery({ name: 'role', enum: RoleEnum, required: false })
	@ApiQuery({ name: 'name', required: false })
	@ApiQuery({ name: 'email', required: false })
	search(
		@ActiveUserId() userId: string,
		@Query('name') name?: string,
		@Query('email') email?: string,
		@Query('role', new OptionalParseEnumPipe(RoleEnum)) role?: RoleEnum,
	) {
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
	delete(@Param('id', ParseUUIDPipe) userId: string) {
		return this.usersService.remove(userId);
	}
}
