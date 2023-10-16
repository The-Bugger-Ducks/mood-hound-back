import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';

import { IsPublic } from '../../shared/decorators/IsPublic.decorator';

import { SigninDto } from './dto/signin.dto';

@Controller('auth')
@IsPublic()
@ApiTags('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) { }

	@Post('signin')
	signin(@Body() signinDto: SigninDto) {
		return this.authService.signin(signinDto);
	}
}
