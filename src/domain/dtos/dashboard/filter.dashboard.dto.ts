import { IsDate, IsEnum, IsOptional, IsString } from 'class-validator';
import { PartialType } from '@nestjs/swagger';

import { CommentTopicEnum } from '../../../domain/entities/comment.entity';
import { Transform } from 'class-transformer';

class FilterDashboard {
	@IsOptional()
	@IsEnum(CommentTopicEnum)
	topic: CommentTopicEnum;

	@IsOptional()
	@IsString()
	state: string;

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
	dateEnd: Date;
}

export class FilterDashboardDto extends PartialType(FilterDashboard) { }
