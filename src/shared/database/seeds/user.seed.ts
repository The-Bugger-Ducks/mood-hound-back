import * as dotenv from 'dotenv';

import { hash } from 'bcryptjs';

import { MongoClient } from 'mongodb';

import { users } from '../mocks/user.mock';

import { UserRoleEnum } from 'src/domain/entities';

const client = new MongoClient(process.env.DATABASE_URL);

async function clientDb() {
	await client
		.connect()
		.then(() => console.log('DATABASE CONNECTION SUCCESS'))
		.catch((e) => console.error('DATABASE CONNECTION ERROR', e.stack));

	return client.db(process.env.DB_NAME).collection('users');
}

async function main() {
	dotenv.config();

	const userCollection = await clientDb();

	for (let userIndex = 0; userIndex < users.length; userIndex++) {
		const user = users[userIndex];

		const hashedPassword = await hash(user.password, 12);
		user.password = hashedPassword;

		await userCollection.insertOne({
			email: user.email,
			name: user.name,
			password: user.password,
			role: user.role === 'ADMIN' ? UserRoleEnum.ADMIN : UserRoleEnum.VIEWER,
		});
	}
}

main()
	.catch((e) => console.error(e))
	.finally(() => client.close());
