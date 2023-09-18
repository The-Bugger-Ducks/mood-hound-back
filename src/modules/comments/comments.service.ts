import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { CommentsRepository } from 'src/shared/database/repositories/comments.repositories';

import { CreateCommentDto } from './dto/create-comment.dto';

import {
	PageDto,
	PageOptionsDto,
	PageMetaDto,
} from 'src/shared/utils/paginator';

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

	async findAll(pagination: PageOptionsDto) {
		let query: Prisma.CommentFindManyArgs = {
			take: pagination.previous ? -pagination.take : pagination.take,
			orderBy: { text: pagination.order.toString() as Prisma.SortOrder },
		};
		if (pagination.cursor) {
			query = {
				...query,
				skip: pagination.skip,
				cursor: {
					id: pagination.cursor,
				},
			};
		}

		const comments = await this.commentsRepo.findMany(query);

		const pageMetaDto = new PageMetaDto({
			itemCount: comments.length,
			pageOptionsDto: pagination,
			cursor: !!comments.length ? comments.at(-1).id : null,
		});

		return new PageDto(comments, pageMetaDto);
	}
}
