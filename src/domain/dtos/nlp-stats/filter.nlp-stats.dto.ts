import { IsDate, IsOptional } from 'class-validator';
import { PartialType } from '@nestjs/swagger';

import { Transform } from 'class-transformer';

class FilterNlpStats {
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
		return date
	})
	@IsDate()
	dateEnd: Date;
}

export class FilterNlpStatsDto extends PartialType(FilterNlpStats) { }
