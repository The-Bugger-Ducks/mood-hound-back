import { Controller, Get, Post, Body, Query } from '@nestjs/common';

import { CommentsService } from './comments.service';

import { IsPublic } from '../../shared/decorators/IsPublic.decorator';

import { PageOptionsDto } from '../../shared/utils/paginator';

import { CreateCommentDto } from './dto/create-comment.dto';
import { FilterCommentDto } from './dto/filter.comment.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('comments')
@ApiTags('comments')
export class CommentsController {
	constructor(private readonly commentsService: CommentsService) { }

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
