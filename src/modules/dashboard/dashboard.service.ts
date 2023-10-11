import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/shared/database/services/database.service';

@Injectable()
export class DashboardService {
	constructor(private readonly databaseService: DatabaseService) {}

	findAll() {
		return this.databaseService.comments.rankingOfTopics();
	}
}
