import { Module, forwardRef } from '@nestjs/common';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthModule } from '../auth/auth.module';
import { DatabaseService } from '../../shared/database/services/database.service';
import { DatabaseModule } from '../../shared/database/database.module';

@Module({
	imports: [DatabaseModule, forwardRef(() => AuthModule)],
	controllers: [UsersController],
	providers: [UsersService, DatabaseService],
	exports: [UsersService]
})
export class UsersModule { }
