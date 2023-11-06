import { IsDate, IsEnum, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

import { PartialType } from '@nestjs/swagger';

import { CommentTopicEnum } from '../../../domain/entities/comment.entity';

class FilterComment {
	@IsOptional()
	@IsString()
	comment: string;

	@IsOptional()
	@IsEnum(CommentTopicEnum)
	topic: CommentTopicEnum;

	@IsOptional()
	@Transform(({ value }) => {
		const date = new Date(value)
		if (Date.prototype.toString.call(date) == 'Invalid Date') {
			return value
		}
		return date
	})
	@IsDate()
	dateStart: Date;

	@IsOptional()
	@Transform(({ value }) => {
		const date = new Date(value)
		if (Date.prototype.toString.call(date) == 'Invalid Date') {
			return value
		}
		const lastDayOfMonth = new Date(date.getUTCFullYear(), date.getUTCMonth() + 1, 0)
		return lastDayOfMonth
	})
	@IsDate()
	dateDone: Date;
}

export class FilterCommentDto extends PartialType(FilterComment) { }
