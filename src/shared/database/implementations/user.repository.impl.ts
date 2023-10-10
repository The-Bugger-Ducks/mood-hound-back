import { Db, Collection, ObjectId, OptionalId, Filter } from 'mongodb';

import { UserRepository } from 'src/domain/repositories';

import { CreateUserDto, UpdateUserDto } from 'src/domain/dtos';
import { UserEntity, UserRoleEnum } from 'src/domain/entities';

import { MongoUtils } from 'src/shared/utils/Mongo.util';

type IUserMongoEntity = Pick<UserEntity, Exclude<keyof UserEntity, 'id'>> & {
	_id: ObjectId;
};

export class UserRepositoryImpl implements UserRepository {
	readonly userCollection: Collection<OptionalId<IUserMongoEntity>>;

	constructor(private mongodbClient: Db) {
		this.userCollection =
			this.mongodbClient.collection<OptionalId<IUserMongoEntity>>('users');
	}

	async findByEmail(email: string): Promise<UserEntity> {
		try {
			const userDocument = await this.userCollection.findOne({
				email: email,
			});

			return MongoUtils.convertEntityMongo(userDocument);
		} catch (error) {
			throw new Error(`Erro ao realizar consulta ${error}`);
		}
	}

	async findAll(): Promise<UserEntity[] | Error> {
		try {
			return await this.userCollection.find({}).toArray();
		} catch (error) {
			throw new Error(`Erro ao realizar consulta ${error}`);
		}
	}

	async findMany(user: Partial<UserEntity>): Promise<UserEntity[]> {
		try {
			const filter: Filter<UserEntity> = {
				_id: { $ne: MongoUtils.stringToObjectID(user.id) },
			};

			if (user.name) {
				filter.name = { $regex: user.name, $options: 'i' };
			}
			if (user.email) {
				filter.email = { $regex: user.email, $options: 'i' };
			}
			if (user.role) {
				filter.role = { $regex: user.role, $options: 'i' };
			}

			const users = await this.userCollection
				.find(filter, {
					projection: {
						_id: true,
						name: true,
						email: true,
						role: true,
					},
				})
				.toArray();

			return MongoUtils.convertEntityMongoList(users);
		} catch (error) {
			throw new Error(`Erro ao realizar consulta ${error}`);
		}
	}

	async findOne(id: string): Promise<UserEntity> {
		try {
			const user = await this.userCollection.findOne(
				{
					_id: MongoUtils.stringToObjectID(id),
				},
				{
					projection: {
						_id: true,
						name: true,
						email: true,
						role: true,
					},
				},
			);

			return MongoUtils.convertEntityMongo(user);
		} catch (error) {
			throw new Error(`Erro ao realizar consulta ${error}`);
		}
	}

	async create(createUserDto: CreateUserDto): Promise<void> {
		try {
			const { name, email, password, role } = createUserDto;

			await this.userCollection.insertOne({
				name,
				email,
				password,
				role,
			});
			return;
		} catch (error) {
			throw new Error(`Erro ao realizar consulta ${error}`);
		}
	}

	async update(id: string, updateUserDto: UpdateUserDto): Promise<void> {
		try {
			const { name, password } = updateUserDto;

			await this.userCollection.updateOne(
				{ _id: MongoUtils.stringToObjectID(id) },
				{
					$set: { name: name, password: password },
				},
			);
			return;
		} catch (error) {
			throw new Error(`Erro ao realizar consulta ${error}`);
		}
	}

	async updateRole(id: string, role: UserRoleEnum): Promise<void> {
		try {
			await this.userCollection.updateOne(
				{ _id: MongoUtils.stringToObjectID(id) },
				{
					$set: { role: role },
				},
			);
			return;
		} catch (error) {
			throw new Error(`Erro ao realizar consulta ${error}`);
		}
	}

	async delete(id: string): Promise<void> {
		try {
			await this.userCollection.deleteOne({
				_id: MongoUtils.stringToObjectID(id),
			});
			return;
		} catch (error) {
			throw new Error(`Erro ao realizar consulta ${error}`);
		}
	}
}
