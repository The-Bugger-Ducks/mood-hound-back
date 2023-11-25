import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PerformanceMetricsService } from './performance-metrics.service';
import { FilterNlpStatsDto } from '../../domain/dtos/nlp-stats/filter.nlp-stats.dto';

@Controller('performance-metrics')
@ApiTags('Performance Metrics')
export class PerformanceMetricsController {
	constructor(private readonly performanceMetricsService: PerformanceMetricsService) { }

	@Get()
	findAll(
		@Query() filters: FilterNlpStatsDto,
	) {
		return this.performanceMetricsService.findAll(filters);
	}
}
