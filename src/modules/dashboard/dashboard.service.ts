import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../shared/database/services/database.service';
import { FilterDashboardDto } from '../../domain/dtos/dashboard/filter.dashboard.dto';

@Injectable()
export class DashboardService {
	constructor(private readonly databaseService: DatabaseService) { }

	async findAll(filters: FilterDashboardDto) {
		const rankingOfTopics =
			await this.databaseService.comments.rankingOfTopics(filters);

		const timeSeriesDataTopic =
			await this.databaseService.comments.timeSeriesDataTopic(filters);

		const commentsPerState =
			await this.databaseService.comments.commentsPerState(filters);

		return { rankingOfTopics, timeSeriesDataTopic, commentsPerState };
	}
}
