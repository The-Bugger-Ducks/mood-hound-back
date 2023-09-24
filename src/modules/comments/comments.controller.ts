import { Controller, Get, Post, Body, Query } from '@nestjs/common';

import { CommentsService } from './comments.service';

import { IsPublic } from 'src/shared/decorators/IsPublic.decorator';

import { PageOptionsDto } from 'src/shared/utils/paginator/pageOptions.dto';

import { CreateCommentDto } from './dto/create-comment.dto';
import { FilterCommentDto } from './dto/filter.comment.dto';

@Controller('comments')
export class CommentsController {
	constructor(private readonly commentsService: CommentsService) {}

	@Post()
	@IsPublic()
	create(@Body() createCommentDto: CreateCommentDto) {
		return this.commentsService.create(createCommentDto);
	}

	@Get()
	@IsPublic()
	findAll(
		@Query() pageOptionsDto: PageOptionsDto,
		@Query() filters: FilterCommentDto,
	) {
		return this.commentsService.findAll(pageOptionsDto, filters);
	}
}
