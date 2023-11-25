import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PerformanceMetricsService } from './performance-metrics.service';

@Controller('performance-metrics')
@ApiTags('Performance Metrics')
export class PerformanceMetricsController {
	constructor(private readonly performanceMetricsService: PerformanceMetricsService) { }

	@Get()
	findAll() {
		return this.performanceMetricsService.findAll();
	}
}
