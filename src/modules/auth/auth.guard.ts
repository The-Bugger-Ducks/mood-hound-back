import {
	CanActivate,
	ExecutionContext,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';

import { env } from '../../shared/config/env';
import { UserRoleEnum } from '../../domain/entities/user.entity';

import { HAS_ROLES_KEY } from '../../shared/decorators/HasRoles.decorator';
import { IS_PUBLIC_KEY } from '../../shared/decorators/IsPublic.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(private jwtService: JwtService, private reflector: Reflector) { }

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
			context.getClass(),
			context.getHandler(),
		]);

		if (isPublic) {
			return true;
		}

		const requiredRoles = this.reflector.getAllAndOverride<UserRoleEnum[]>(
			HAS_ROLES_KEY,
			[context.getHandler(), context.getClass()],
		);

		const request = context.switchToHttp().getRequest();

		const token = this.extractTokenFromHeader(request);

		if (!token) {
			throw new UnauthorizedException();
		}

		try {
			const payload = await this.jwtService.verifyAsync(token, {
				secret: env.jwtSecret,
			});

			const { userId, role } = payload.sub;

			if (
				requiredRoles &&
				!requiredRoles.some((requiredRole) => role.includes(requiredRole))
			) {
				throw new UnauthorizedException();
			}

			request['userId'] = userId;
		} catch {
			throw new UnauthorizedException();
		}

		return true;
	}

	private extractTokenFromHeader(request: Request): string | undefined {
		const [type, token] = request.headers.authorization?.split(' ') ?? [];

		return type === 'Bearer' ? token : undefined;
	}
}
