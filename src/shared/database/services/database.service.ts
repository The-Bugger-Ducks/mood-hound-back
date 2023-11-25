import {
	Global,
	Inject,
	Injectable,
	OnApplicationBootstrap,
	OnModuleDestroy,
} from '@nestjs/common';

import { MongoClient } from 'mongodb';

import { DATABASE_PROVIDER_NAME } from '../database.module';

import { env } from '../../../shared/config/env';

import { IDataServices } from '../../../domain/abstractions';
import { CommentRepository, NlpStatsRepository, UserRepository } from '../../../domain/repositories';

import { UserRepositoryImpl, CommentRepositoryImpl, NlpStatsRepositoryImpl } from '../implementations';

@Global()
@Injectable()
export class DatabaseService
	implements IDataServices, OnApplicationBootstrap, OnModuleDestroy {
	public users: UserRepository;
	public comments: CommentRepository;
	public nlpStats: NlpStatsRepository;

	constructor(@Inject(DATABASE_PROVIDER_NAME) private client: MongoClient) { }

	async onModuleDestroy() {
		await this.client
			.close()
			.then(() => console.log('DATABASE HAS DISCONNECTED'))
			.catch((err) =>
				console.error('ERROR DURING DATABASE DISCONNECTION', err.stack),
			);
	}

	onApplicationBootstrap() {
		const database = this.client.db(env.dbName);

		this.users = new UserRepositoryImpl(database);
		this.comments = new CommentRepositoryImpl(database);
		this.nlpStats = new NlpStatsRepositoryImpl(database);
	}
}
