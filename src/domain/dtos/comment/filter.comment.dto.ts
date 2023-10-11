import { IsDateString, IsEnum, IsString } from 'class-validator';
import { PartialType } from '@nestjs/swagger';

import { CommentTopicEnum } from 'src/domain/entities/comment.entity';

class FilterComment {
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
