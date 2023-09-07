import { Body, Controller, Post } from '@nestjs/common';

import { AuthService } from './auth.service';

import { IsPublic } from 'src/shared/decorators/IsPublic.decorator';

import { SigninDto } from './dto/signin.dto';
import { SignupDto } from './dto/signup.dto';

@Controller('auth')
@IsPublic()
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('signin')
	signin(@Body() signinDto: SigninDto) {
		return this.authService.signin(signinDto);
	}

	@Post('signup')
	signup(@Body() signupDto: SignupDto) {
		return this.authService.signup(signupDto);
	}
}
