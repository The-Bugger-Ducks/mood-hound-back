import { PageOptionsDto } from './pageOptions.dto';

export class PageMetaDto {
	take: number;
	hasPreviousPage: boolean;
	hasNextPage: boolean;
	cursor: string;

	constructor({
		pageOptionsDto,
		itemCount,
		cursor,
	}: {
		pageOptionsDto: PageOptionsDto;
		itemCount: number;
		cursor: string | null;
	}) {
		this.take = pageOptionsDto.take;
		this.hasPreviousPage = !!pageOptionsDto.cursor && itemCount == this.take;
		this.hasNextPage = itemCount == this.take;
		this.cursor = cursor;
	}
}
