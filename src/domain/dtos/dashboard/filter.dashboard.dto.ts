import { IsDateString, IsEnum, IsString } from 'class-validator';
import { PartialType } from '@nestjs/swagger';

import { CommentTopicEnum } from '../../../domain/entities/comment.entity';

class FilterDashboard {
	@IsEnum(CommentTopicEnum)
	topic: CommentTopicEnum;

	@IsString()
	state: string;

	@IsDateString()
	dateStart: Date;

	@IsDateString()
	dateEnd: Date;
}

export class FilterDashboardDto extends PartialType(FilterDashboard) { }
