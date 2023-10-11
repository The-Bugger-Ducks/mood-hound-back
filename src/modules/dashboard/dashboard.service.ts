import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/shared/database/services/database.service';

@Injectable()
export class DashboardService {
	constructor(private readonly databaseService: DatabaseService) {}

	async findAll() {
		const rankingOfTopics =
			await this.databaseService.comments.rankingOfTopics();

		const timeSeriesDataTopic =
			await this.databaseService.comments.timeSeriesDataTopic();

		return { rankingOfTopics, timeSeriesDataTopic };
	}
}
