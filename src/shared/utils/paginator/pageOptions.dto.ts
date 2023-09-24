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
	take?: number = 100;

	@IsEnum(Order)
	@IsOptional()
	order?: Order = Order.ASC;

	@IsString()
	@IsOptional()
	cursor?: string;

	@ValidateIf((property) => property.cursor)
	@Transform((property) => property.value === 'true')
	@IsBoolean()
	next?: boolean;

	@ValidateIf((property) => property.cursor)
	@Transform((property) => property.value === 'true')
	@IsBoolean()
	previous?: boolean;

	get skip(): number {
		return this.cursor ? 1 : 0;
	}
}
