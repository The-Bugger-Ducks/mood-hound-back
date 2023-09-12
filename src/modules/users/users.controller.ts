import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { UsersService } from './users.service';
import { ActiveUserId } from 'src/shared/decorators/ActiveUserId.decorator';

@Controller('users')
@ApiTags('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Get('/me')
	me(@ActiveUserId() userId: string) {
		return this.usersService.getUserById(userId);
	}
}
