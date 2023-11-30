import {
	Db,
	Collection,
	OptionalId,
	Filter,
} from 'mongodb';

import { NlpStatsEntity, NlpStatsMongoEntity } from '../../../domain/entities';
import { NlpStatsRepository } from '../../../domain/repositories';
import { TimeUtils } from '../../utils/Time.utils';
import { FilterNlpStatsDto } from '../../../domain/dtos';

export class NlpStatsRepositoryImpl implements NlpStatsRepository {
	readonly nlpStatsCollection: Collection<OptionalId<NlpStatsMongoEntity>>;

	constructor(private mongodbClient: Db) {
		this.nlpStatsCollection =
			this.mongodbClient.collection<OptionalId<NlpStatsMongoEntity>>('stats');
	}

	async findAll(): Promise<NlpStatsEntity[] | Error> {
		return
	}

	async findOne(id: string): Promise<NlpStatsEntity> {
		return
	}

	async create(createNlpStatsDto: NlpStatsEntity): Promise<void> {
		return;
	}

	async processingTime(filters: FilterNlpStatsDto) {
		const filter = this.filtersQuery(filters);

		const documents = await this.nlpStatsCollection.find(filter).toArray()

		const metricDocuments = documents.map(metric => new NlpStatsMongoEntity(metric._id, metric.metrics, metric.erros))
		const metrics = metricDocuments.map(metric => new NlpStatsEntity(metric))

		const dailyTotalProcessingTime = this.dailyTotalProcessingTime(metrics)
		const timeByPipelineStage = this.timeByPipelineStage(metrics)
		const totalDocumentsProcessed = this.getTotalDocumentsProcessed(metrics)
		const errorRate = this.getErrorRate(metrics)
		const dailyTotalErrors = this.getDailyTotalErrors(metrics)
		const errorsByType = this.getErrorsByType(metrics)

		return {
			dailyTotalProcessingTime,
			timeByPipelineStage,
			totalDocumentsProcessed,
			errorRate,
			dailyTotalErrors,
			errorsByType
		}
	}


	private getErrorsByType(metrics: NlpStatsEntity[]) {
		const errors = metrics.flatMap(metric => metric.errors)

		const errorsByType: Array<{ type: string, errors: number }> = []
		errors.forEach(error => {
			const findError = errorsByType.find(errorType => errorType.type === error.type)

			if (!findError) {
				errorsByType.push({ type: error.type, errors: error.value })
				return
			}
			findError.errors += error.value
		})

		return errorsByType
	}

	private getErrorRate(metrics: NlpStatsEntity[]) {
		const totalErrors = metrics.reduce((acc, metric) => {
			const numberOfErrors = metric.errors.reduce((accError, error) => error.value + accError, 0)
			return numberOfErrors + acc
		}, 0)

		return {
			total: this.getTotalDocumentsProcessed(metrics),
			errors: totalErrors,
		}
	}

	private getDailyTotalErrors(metrics: NlpStatsEntity[]) {
		return metrics.map(metric => {
			const numberOfErrors = metric.errors.reduce((accError, error) => error.value + accError, 0)

			return {
				day: new Date().toString(), errors: numberOfErrors
			}
		})
	}

	private getTotalDocumentsProcessed(metrics: NlpStatsEntity[]) {
		return metrics.reduce((acc, metric) => metric.totalOfData + acc, 0)
	}

	private dailyTotalProcessingTime(metrics: NlpStatsEntity[]) {
		return metrics.map(metric => {

			const totalProcessingTimeInSecods = metric.stages.reduce((totalSeconds, stage) => {
				if (stage.stage == "Pipeline completa") {
					return totalSeconds
				}
				const seconds = TimeUtils.timeToSecods(stage.time)

				return totalSeconds + seconds
			}, 0)

			return {
				time: totalProcessingTimeInSecods, day: metric.createdAt
			}
		})
	}

	private timeByPipelineStage(metrics: NlpStatsEntity[]) {
		return metrics.flatMap(metric => {
			return metric.stages.map(stage => {
				return {
					stage: stage.stage,
					day: stage.day,
					time: TimeUtils.timeToSecods(stage.time)
				}
			}).filter(stage => stage.stage != "Pipeline completa")
		})
	}

	private filtersQuery(filters: FilterNlpStatsDto): Filter<NlpStatsMongoEntity> {
		const filter: Filter<NlpStatsMongoEntity> = {};

		if (filters.dateStart && filters.dateEnd) {
			filter.created_at = { $gte: new Date(filters.dateStart), $lte: new Date(filters.dateEnd) };
		} else if (filters.dateStart) {
			filter.created_at = { $gte: new Date(filters.dateStart) };
		} else if (filters.dateEnd) {
			filter.created_at = { $lte: new Date(filters.dateEnd) };
		}

		return filter
	}
}
