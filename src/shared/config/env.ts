import { plainToInstance } from 'class-transformer';
import { IsNotEmpty, IsString, NotEquals, validateSync } from 'class-validator';

class Env {
	@IsString()
	@IsNotEmpty({ message: 'DATABASE_URL not found' })
	dbURL: string;

	@IsString()
	@IsNotEmpty({ message: 'DATABASE_NAME not found' })
	dbName: string;

	@IsString()
	@IsNotEmpty({ message: 'JWT_SECRET not found' })
	@NotEquals('unsecure_jwt_secret')
	jwtSecret: string;
}

export const env: Env = plainToInstance(Env, {
	jwtSecret: process.env.JWT_SECRET,
	dbURL: process.env.DATABASE_URL,
	dbName: process.env.DB_NAME,
});

const errors = validateSync(env);

if (errors.length > 0) {
	throw new Error(JSON.stringify(errors, null, 2));
}
