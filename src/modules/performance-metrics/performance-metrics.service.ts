import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../shared/database/services/database.service';

@Injectable()
export class PerformanceMetricsService {
	constructor(private readonly databaseService: DatabaseService) { }

	async findAll() {
		const totalDocumentsProcessed = 1
		const errorRate = {
			total: 1000,
			errors: 300,
		};
		const { dailyTotalProcessingTime, timeByPipelineStage } = await this.databaseService.nlpStats.processingTime()
		const dailyTotalErrors = [
			{ day: new Date().toString(), errors: 45 },
			{ day: new Date(8.64e15).toString(), errors: 80 },
		];
		const errorsByType = [
			{ type: "Teste 01", errors: 12 },
			{ type: "Teste 02", errors: 31 },
		];

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
