import { Document } from 'mongodb';

import { IGenericRepository } from '../abstractions/generic-repository.abstract';
import { CommentEntity } from '../entities/comment.entity';

import { FilterCommentDto, FilterDashboardDto } from '../dtos';
import { PageOptionsDto } from '../../shared/utils/paginator/pageOptions.dto';

export interface CommentRepository extends IGenericRepository<CommentEntity> {
	findMany(
		filters: FilterCommentDto,
		pagination: PageOptionsDto,
	): Promise<{
		comments: CommentEntity[];
		total: number;
	}>;

	rankingOfTopics(
		filters: FilterDashboardDto
	): Promise<Document[]>;

	timeSeriesDataTopic(
		filters: FilterDashboardDto
	): Promise<Document[]>;

	commentsPerState(
		filters: FilterDashboardDto
	): Promise<any>;

	commentsPerAgeGroup(
		filters: FilterDashboardDto
	): Promise<any>;

	commentsPerGender(
		filters: FilterDashboardDto
	): Promise<any>;
}
