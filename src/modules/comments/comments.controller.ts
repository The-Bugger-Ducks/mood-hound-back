import { Controller, Get, Query } from '@nestjs/common';

import { CommentsService } from './comments.service';

import { IsPublic } from '../../shared/decorators/IsPublic.decorator';

import { PageOptionsDto } from '../../shared/utils/paginator/pageOptions.dto';

import { FilterCommentDto } from '../../domain/dtos';

import { ApiTags } from '@nestjs/swagger';

@Controller('comments')
@ApiTags('comments')
export class CommentsController {
	constructor(private readonly commentsService: CommentsService) { }

	@Get()
	@IsPublic()
	findAll(
		@Query() pageOptionsDto: PageOptionsDto,
		@Query() filters: FilterCommentDto,
	) {
		return this.commentsService.findAll(pageOptionsDto, filters);
	}
}
