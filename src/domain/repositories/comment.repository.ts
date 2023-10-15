import { Document } from 'mongodb';

import { IGenericRepository } from '../abstractions/generic-repository.abstract';
import { CommentEntity } from '../entities/comment.entity';

import { FilterCommentDto } from '../dtos/comment/filter.comment.dto';
import { PageOptionsDto } from '../../shared/utils/paginator/pageOptions.dto';

export interface CommentRepository extends IGenericRepository<CommentEntity> {
	findMany(
		filters: FilterCommentDto,
		pagination: PageOptionsDto,
	): Promise<{
		comments: CommentEntity[];
		total: number;
	}>;

	rankingOfTopics(): Promise<Document[]>;
	timeSeriesDataTopic(): Promise<Document[]>;
	commentsPerState(): Promise<any>;
}
