import {
	Db,
	Collection,
	OptionalId,
} from 'mongodb';

import { NlpStatsEntity, NlpStatsMongoEntity } from '../../../domain/entities';
import { NlpStatsRepository } from '../../../domain/repositories';

export class NlpStatsRepositoryImpl implements NlpStatsRepository {
	readonly nlpStatsCollection: Collection<OptionalId<NlpStatsMongoEntity>>;

	constructor(private mongodbClient: Db) {
		this.nlpStatsCollection =
			this.mongodbClient.collection<OptionalId<NlpStatsMongoEntity>>('stats');
	}

	async findAll(): Promise<NlpStatsEntity[] | Error> {
		return;
	}

	async findOne(id: string): Promise<NlpStatsEntity> {
		return
	}

	async create(createNlpStatsDto: NlpStatsEntity): Promise<void> {
		return;
	}
}
