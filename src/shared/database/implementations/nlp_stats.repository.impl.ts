import {
	Db,
	Collection,
	OptionalId,
} from 'mongodb';

import { NlpStatsEntity, NlpStatsMongoEntity } from '../../../domain/entities';
import { NlpStatsRepository } from '../../../domain/repositories';
import { TimeUtils } from '../../utils/Time.utils';

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

	async processingTime() {
		const metrics = await this.nlpStatsCollection.find({}).toArray()

		const dailyTotalProcessingTime = this.dailyTotalProcessingTime(metrics)
		const timeByPipelineStage = this.timeByPipelineStage(metrics)

		return {
			dailyTotalProcessingTime,
			timeByPipelineStage
		}
	}

	private dailyTotalProcessingTime(metrics: NlpStatsMongoEntity[]) {
		return metrics.map(metric => {
			const acessExecTimeInSecods = TimeUtils.timeToSecods(metric.execution_times.acess_exec_time)
			const clearExecTimeInSecods = TimeUtils.timeToSecods(metric.execution_times.clear_exec_time)
			const trainingModelExecTimeInSecods = TimeUtils.timeToSecods(metric.execution_times.training_model_exec_time)

			const totalProcessingTimeInSecods = acessExecTimeInSecods + clearExecTimeInSecods + trainingModelExecTimeInSecods

			return {
				time: totalProcessingTimeInSecods, day: metric.created_at
			}
		})
	}

	private timeByPipelineStage(metrics: NlpStatsMongoEntity[]) {
		return metrics.flatMap(metric => {
			const acessExecTimeInSecods = TimeUtils.timeToSecods(metric.execution_times.acess_exec_time)
			const clearExecTimeInSecods = TimeUtils.timeToSecods(metric.execution_times.clear_exec_time)
			const trainingModelExecTimeInSecods = TimeUtils.timeToSecods(metric.execution_times.training_model_exec_time)

			return [
				{
					stage: "Acesso ao dados", day: metric.created_at, time: acessExecTimeInSecods
				},
				{
					stage: "Limpeza dos dados", day: metric.created_at, time: clearExecTimeInSecods
				},
				{
					stage: "Treinamento do Modelo", day: metric.created_at, time: trainingModelExecTimeInSecods
				},
			]
		})
	}
}
