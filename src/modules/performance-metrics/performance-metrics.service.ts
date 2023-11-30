import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../shared/database/services/database.service';
import { FilterNlpStatsDto } from '../../domain/dtos/nlp-stats/filter.nlp-stats.dto';

@Injectable()
export class PerformanceMetricsService {
	constructor(private readonly databaseService: DatabaseService) { }

	async findAll(filters: FilterNlpStatsDto) {
		const {
			totalDocumentsProcessed,
			dailyTotalProcessingTime,
			timeByPipelineStage,
			errorRate,
			dailyTotalErrors,
			errorsByType
		} = await this.databaseService.nlpStats.processingTime(filters)

		return {
			totalDocumentsProcessed,
			errorRate,
			dailyTotalProcessingTime,
			dailyTotalErrors,
			errorsByType,
			timeByPipelineStage
		}
	}
}
