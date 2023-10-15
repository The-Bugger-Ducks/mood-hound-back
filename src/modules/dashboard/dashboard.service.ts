import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../shared/database/services/database.service';

@Injectable()
export class DashboardService {
	constructor(private readonly databaseService: DatabaseService) { }

	async findAll() {
		const rankingOfTopics =
			await this.databaseService.comments.rankingOfTopics();

		const timeSeriesDataTopic =
			await this.databaseService.comments.timeSeriesDataTopic();

		const commentsPerState =
			await this.databaseService.comments.commentsPerState();

		return { rankingOfTopics, timeSeriesDataTopic, commentsPerState };
	}
}
