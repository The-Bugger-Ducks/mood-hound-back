import {
	Global,
	Inject,
	Injectable,
	OnApplicationBootstrap,
	OnModuleDestroy,
} from '@nestjs/common';

import { MongoClient } from 'mongodb';

import { DATABASE_PROVIDER_NAME } from '../database.module';

import { IDataServices } from 'src/domain/abstractions';
import { UserRepositoryImpl } from '../implementations';
import { env } from 'src/shared/config/env';
import { UserRepository } from 'src/domain/repositories';

@Global()
@Injectable()
export class DatabaseService
	implements IDataServices, OnApplicationBootstrap, OnModuleDestroy
{
	public users: UserRepository;

	constructor(@Inject(DATABASE_PROVIDER_NAME) private client: MongoClient) {}

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
	}
}
