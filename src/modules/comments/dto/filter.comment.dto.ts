import { IsDateString, IsEnum, IsString } from 'class-validator';
import { CommentTopicEnum } from '../entities/comment.entity';
import { PartialType } from '@nestjs/swagger';

export class FilterComment {
	@IsString()
	comment: string;

	@IsEnum(CommentTopicEnum)
	topic: CommentTopicEnum;

	@IsDateString()
	dateStart: Date;

	@IsDateString()
	dateDone: Date;
}

export class FilterCommentDto extends PartialType(FilterComment) {}
