import { Injectable, UnauthorizedException } from '@nestjs/common';

import { compare } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

import { SigninDto } from './dto/signin.dto';
import { UsersRepository } from '../../shared/database/repositories/users.repositories';

@Injectable()
export class AuthService {
	constructor(
		private readonly usersRepo: UsersRepository,
		private readonly jwtService: JwtService,
	) { }

	async signin(signinDto: SigninDto) {
		const { email, password } = signinDto;

		const user = await this.usersRepo.findUnique({
			where: { email: email },
			select: { id: true, password: true, role: true },
		});

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
