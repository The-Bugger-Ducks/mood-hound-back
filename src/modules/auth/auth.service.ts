import { Injectable, UnauthorizedException } from '@nestjs/common';

import { compare } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

import { DatabaseService } from 'src/shared/database/services/database.service';

import { SigninDto } from './dto/signin.dto';

@Injectable()
export class AuthService {
	constructor(
		private readonly databaseService: DatabaseService,
		private readonly jwtService: JwtService,
	) {}

	async signin(signinDto: SigninDto) {
		const { email, password } = signinDto;

		const user = await this.databaseService.users.findByEmail(email);

		if (!user) {
			throw new UnauthorizedException('Invalid credentials.');
		}

		const isPasswordValid = await compare(password, user.password);

		if (!isPasswordValid) {
			throw new UnauthorizedException('Invalid credentials.');
		}

		const accessToken = await this.generateAccessToken(user.id, user.role);

		return { accessToken };
	}

	private generateAccessToken(userId: string, role: string) {
		return this.jwtService.signAsync({ sub: { userId, role } });
	}
}
