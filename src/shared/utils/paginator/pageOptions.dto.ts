import { Transform, Type } from 'class-transformer';

import {
	IsBoolean,
	IsEnum,
	IsInt,
	IsOptional,
	IsString,
	Max,
	Min,
	ValidateIf,
} from 'class-validator';

enum Order {
	ASC = 'asc',
	DESC = 'desc',
}

export class PageOptionsDto {
	@Type(() => Number)
	@IsInt()
	@Max(500)
	@Min(1)
	limit?: number = 100;

	@IsEnum(Order)
	@IsOptional()
	order?: Order = Order.ASC;

	@Type(() => Number)
	@Min(1)
	@IsInt()
	page: number;
}
