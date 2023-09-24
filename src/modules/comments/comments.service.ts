import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { CommentsRepository } from 'src/shared/database/repositories/comments.repositories';

import {
	PageDto,
	PageOptionsDto,
	PageMetaDto,
} from 'src/shared/utils/paginator';

import { CreateCommentDto } from './dto/create-comment.dto';
import { FilterCommentDto } from './dto/filter.comment.dto';

@Injectable()
export class CommentsService {
	constructor(private readonly commentsRepo: CommentsRepository) {}

	create(createCommentDto: CreateCommentDto) {
		const { productId, productName, rating, sentiment, text, topic } =
			createCommentDto;

		return this.commentsRepo.create({
			data: {
				productId,
				productName,
				rating,
				text,
				topic,
				sentiment,
			},
		});
	}

	async findAll(pagination: PageOptionsDto, filters: FilterCommentDto) {
		const filter = this.filtersQuery(filters);

		const query = this.paginationQuery(pagination);

		if (filter) {
			query.where = filter;
		}

		const comments = await this.commentsRepo.findMany(query);

		const pageMetaDto = new PageMetaDto({
			itemCount: comments.length,
			pageOptionsDto: pagination,
			cursor: !!comments.length ? comments.at(-1).id : null,
		});

		return new PageDto(comments, pageMetaDto);
	}

	private filtersQuery(
		filters: FilterCommentDto,
	): Prisma.CommentWhereInput | null {
		let where: Prisma.CommentWhereInput = null;

		if (filters.comment && filters.topic) {
			where = {
				text: { contains: filters.comment, mode: 'insensitive' },
				topic: { contains: filters.topic },
			};
		} else if (filters.comment) {
			where = {
				text: { contains: filters.comment, mode: 'insensitive' },
			};
		} else if (filters.topic) {
			where = {
				topic: { contains: filters.topic },
			};
		}

		if (filters.dateStart && filters.dateDone) {
			where = {
				...where,
				addedAt: { lte: filters.dateStart, gte: filters.dateDone },
			};
		} else if (filters.dateStart) {
			where = {
				...where,
				addedAt: { lte: filters.dateStart },
			};
		} else if (filters.dateDone) {
			where = {
				...where,
				addedAt: { gte: filters.dateDone },
			};
		}

		return where;
	}

	private paginationQuery(pagination: PageOptionsDto) {
		const queryPagination: Prisma.CommentFindManyArgs = {
			take: pagination.previous ? -pagination.take : pagination.take,
			orderBy: { addedAt: pagination.order.toString() as Prisma.SortOrder },
		};

		if (pagination.cursor) {
			queryPagination.cursor = { id: pagination.cursor };
			queryPagination.skip = pagination.skip;
		}

		return queryPagination;
	}
}
