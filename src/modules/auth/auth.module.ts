import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { env } from '../../shared/config/env';
import { UsersModule } from '../users/users.module';
import { DatabaseService } from '../../shared/database/services/database.service';

@Module({
	imports: [
		JwtModule.register({
			global: true,
			signOptions: { expiresIn: '7d' },
			secret: env.jwtSecret,
		}),
		forwardRef(() => UsersModule),
	],
	controllers: [AuthController],
	providers: [AuthService, DatabaseService],
	exports: [AuthService]
})
export class AuthModule { }
