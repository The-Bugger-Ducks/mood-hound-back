import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { DatabaseService } from 'src/shared/database/services/database.service';

@Module({
	controllers: [DashboardController],
	providers: [DashboardService, DatabaseService],
})
export class DashboardModule {}
