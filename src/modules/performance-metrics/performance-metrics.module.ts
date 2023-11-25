import { Module } from '@nestjs/common';
import { PerformanceMetricsService } from './performance-metrics.service';
import { PerformanceMetricsController } from './performance-metrics.controller';
import { DatabaseService } from '../../shared/database/services/database.service';

@Module({
	controllers: [PerformanceMetricsController],
	providers: [PerformanceMetricsService, DatabaseService],
})
export class PerformanceMetricsModule { }
