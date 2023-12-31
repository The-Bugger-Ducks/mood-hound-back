import { Db, Collection, OptionalId, Filter } from 'mongodb';

import { UserRepository } from '../../../domain/repositories';

import { CreateUserDto, UpdateUserDto } from '../../../domain/dtos';
import { UserEntity, UserMongoEntity, UserRoleEnum } from '../../../domain/entities';

import { MongoUtils } from '../../../shared/utils/Mongo.util';

export class UserRepositoryImpl implements UserRepository {
	readonly userCollection: Collection<OptionalId<UserMongoEntity>>;

	constructor(private mongodbClient: Db) {
		this.userCollection =
			this.mongodbClient.collection<OptionalId<UserMongoEntity>>('users');
	}

	async findByEmail(email: string): Promise<UserEntity> {
		try {
			const userDocument = await this.userCollection.findOne({
				email: email,
			});

			if (userDocument) {
				return new UserEntity(userDocument);
			}

			return null;
		} catch (error) {
			throw new Error(`Erro ao realizar consulta ${error}`);
		}
	}

	async findAll(): Promise<UserEntity[] | Error> {
		try {
			const userDocuments = await this.userCollection.find({}).toArray();

			return userDocuments.map((user) => new UserEntity(user));
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
						password: false,
					},
				})
				.toArray();

			return users.map((user) => new UserEntity(user));
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
						password: false,
					},
				},
			);

			if (!user) {
				return null;
			}

			return new UserEntity(user);
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
			const userUpdate = {}

			if (updateUserDto.name) {
				userUpdate["name"] = updateUserDto.name
			}

			if (updateUserDto.password) {
				userUpdate["password"] = updateUserDto.password
			}

			await this.userCollection.updateOne(
				{ _id: MongoUtils.stringToObjectID(id) },
				{
					$set: userUpdate,
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
