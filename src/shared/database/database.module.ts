import { Global, Module } from '@nestjs/common';
import { MongoClient } from 'mongodb';

import { env } from '../config/env';

export const DATABASE_PROVIDER_NAME = 'DATABASE_CONNECTION';

@Global()
@Module({
	providers: [
		{
			provide: DATABASE_PROVIDER_NAME,
			useFactory: async (): Promise<MongoClient> => {
				try {
					const client = new MongoClient(env.dbURL);

					await client
						.connect()
						.then(() => console.log('DATABASE CONNECTION SUCCESS'))
						.catch((e) => console.error('DATABASE CONNECTION ERROR', e.stack));

					return client;
				} catch (error) {
					throw error;
				}
			},
		},
	],
	exports: [DATABASE_PROVIDER_NAME],
})
export class DatabaseModule {}
