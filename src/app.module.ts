import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

import { DatabaseModule } from './shared/database/database.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { AuthGuard } from './modules/auth/auth.guard';
import { CommentsModule } from './modules/comments/comments.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { PerformanceMetricsModule } from './modules/performance-metrics/performance-metrics.module';

@Module({
	imports: [
		DatabaseModule,
		UsersModule,
		AuthModule,
		CommentsModule,
		DashboardModule,
		PerformanceMetricsModule,
	],
	providers: [
		{
			provide: APP_GUARD,
			useClass: AuthGuard,
		},
	],
})
export class AppModule { }
