import { IGenericRepository } from '../../domain/abstractions/generic-repository.abstract';
import { FilterNlpStatsDto } from '../dtos';
import { NlpStatsEntity } from '../entities';


export interface NlpStatsRepository extends IGenericRepository<NlpStatsEntity> {
	processingTime(
		filters: FilterNlpStatsDto
	): Promise<any>;
}
