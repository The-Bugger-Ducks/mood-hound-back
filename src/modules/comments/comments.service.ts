import { Injectable } from '@nestjs/common';

import { DatabaseService } from 'src/shared/database/services/database.service';

import {
	PageDto,
	PageOptionsDto,
	PageMetaDto,
} from 'src/shared/utils/paginator';

import { CreateCommentDto, FilterCommentDto } from 'src/domain/dtos';

@Injectable()
export class CommentsService {
	constructor(private readonly databaseService: DatabaseService) {}

	create(createCommentDto: CreateCommentDto) {
		const { productId, productName, sentiment, text, topic } = createCommentDto;

		return this.databaseService.comments.create({
			data: {
				productId,
				productName,
				text,
				topic,
				sentiment,
			},
		});
	}

	async findAll(pagination: PageOptionsDto, filters: FilterCommentDto) {
		return;
		// const filter = this.filtersQuery(filters);

		// const query = this.paginationQuery(pagination);

		// if (filter) {
		// 	query.where = filter;
		// }

		// const comments = await this.databaseService.comments.findMany(query);

		// const pageMetaDto = new PageMetaDto({
		// 	itemCount: comments.length,
		// 	pageOptionsDto: pagination,
		// 	cursor: !!comments.length ? comments.at(-1).id : null,
		// });

		// return new PageDto(comments, pageMetaDto);
		// return comments;
	}

	// private filtersQuery(
	// 	filters: FilterCommentDto,
	// ): Prisma.CommentWhereInput | null {
	// 	let where: Prisma.CommentWhereInput = null;

	// 	if (filters.comment && filters.topic) {
	// 		where = {
	// 			text: { contains: filters.comment, mode: 'insensitive' },
	// 			topic: { contains: filters.topic },
	// 		};
	// 	} else if (filters.comment) {
	// 		where = {
	// 			text: { contains: filters.comment, mode: 'insensitive' },
	// 		};
	// 	} else if (filters.topic) {
	// 		where = {
	// 			topic: { contains: filters.topic },
	// 		};
	// 	}

	// 	if (filters.dateStart && filters.dateDone) {
	// 		where = {
	// 			...where,
	// 			addedAt: { lte: filters.dateStart, gte: filters.dateDone },
	// 		};
	// 	} else if (filters.dateStart) {
	// 		where = {
	// 			...where,
	// 			addedAt: { lte: filters.dateStart },
	// 		};
	// 	} else if (filters.dateDone) {
	// 		where = {
	// 			...where,
	// 			addedAt: { gte: filters.dateDone },
	// 		};
	// 	}

	// 	return where;
	// }

	// private paginationQuery(pagination: PageOptionsDto) {
	// 	const queryPagination: Prisma.CommentFindManyArgs = {
	// 		take: pagination.previous ? -pagination.take : pagination.take,
	// 		orderBy: { addedAt: pagination.order.toString() as Prisma.SortOrder },
	// 	};

	// 	if (pagination.cursor) {
	// 		queryPagination.cursor = { id: pagination.cursor };
	// 		queryPagination.skip = pagination.skip;
	// 	}

	// 	return queryPagination;
	// }
}
