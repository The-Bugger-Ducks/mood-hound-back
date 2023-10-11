import { PageOptionsDto } from './pageOptions.dto';

export class PageMetaDto {
	limit: number;
	page: number;
	hasPreviousPage: boolean;
	hasNextPage: boolean;
	totalPages: number;

	constructor({
		pageOptionsDto,
		total,
	}: {
		pageOptionsDto: PageOptionsDto;
		total: number;
	}) {
		this.limit = pageOptionsDto.limit;
		this.page = pageOptionsDto.page;
		this.totalPages = Math.ceil(total / pageOptionsDto.limit);
		this.hasPreviousPage = pageOptionsDto.page != 1;
		this.hasNextPage = pageOptionsDto.page < this.totalPages;
	}
}
