import { Injectable } from '@nestjs/common';

import { DatabaseService } from 'src/shared/database/services/database.service';

import {
	PageDto,
	PageOptionsDto,
	PageMetaDto,
} from 'src/shared/utils/paginator';

import { FilterCommentDto } from 'src/domain/dtos';

@Injectable()
export class CommentsService {
	constructor(private readonly databaseService: DatabaseService) {}

	async findAll(pagination: PageOptionsDto, filters: FilterCommentDto) {
		const { comments, total } = await this.databaseService.comments.findMany(
			filters,
			pagination,
		);

		const pageMetaDto = new PageMetaDto({
			pageOptionsDto: pagination,
			total,
		});

		return new PageDto(comments, pageMetaDto);
	}
}
