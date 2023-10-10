import {
	Db,
	Collection,
	ObjectId,
	OptionalId,
	FindOptions,
	Filter,
} from 'mongodb';

import { CommentEntity } from 'src/domain/entities';
import { CommentRepository } from 'src/domain/repositories';
import { CreateCommentDto, FilterCommentDto } from 'src/domain/dtos';
import { PageOptionsDto } from 'src/shared/utils/paginator/pageOptions.dto';
import { MongoUtils } from 'src/shared/utils/Mongo.util';

type ICommentMongoEntity = Pick<
	CommentEntity,
	Exclude<keyof CommentEntity, 'id'>
> & {
	_id: ObjectId;
};

export class CommentRepositoryImpl implements CommentRepository {
	readonly commentCollection: Collection<OptionalId<ICommentMongoEntity>>;

	constructor(private mongodbClient: Db) {
		this.commentCollection =
			this.mongodbClient.collection<OptionalId<ICommentMongoEntity>>(
				'comments',
			);
	}

	async findAll(): Promise<CommentEntity[] | Error> {
		return;
	}

	async findMany(
		filters: FilterCommentDto,
		pagination: PageOptionsDto,
	): Promise<{ comments: CommentEntity[]; total: number }> {
		try {
			const filter = this.filtersQuery(filters);

			const total = await this.commentCollection.countDocuments(filter);

			const options = this.paginationQuery(pagination);

			const commentDocuments = await this.commentCollection
				.find(filter, options)
				.toArray();

			const comments = MongoUtils.convertEntityMongoList(commentDocuments);

			return { comments, total };
		} catch (error) {
			throw new Error(`Erro ao realizar consulta ${error}`);
		}
	}

	async findOne(id: string): Promise<CommentEntity> {
		return;
	}

	async create(createCommentDto: CreateCommentDto): Promise<void> {
		return;
	}

	private paginationQuery(pagination: PageOptionsDto) {
		const options: FindOptions<CommentEntity> = {
			sort: { product_name: pagination.order },
			limit: pagination.limit,
			skip: (pagination.page - 1) * pagination.limit,
		};

		return options;
	}

	private filtersQuery(filters: FilterCommentDto): Filter<CommentEntity> {
		const filter: Filter<CommentEntity> = {};

		if (filters.comment && filters.topic) {
			filter.text = { $regex: filters.comment, $options: 'i' };
			filter.topic = { $regex: filters.topic, $options: 'i' };
		} else if (filters.comment) {
			filter.text = { $regex: filters.comment, $options: 'i' };
		} else if (filters.topic) {
			filter.topic = { $regex: filters.topic, $options: 'i' };
		}

		if (filters.dateStart && filters.dateDone) {
			filter.addedAt = { $lte: filters.dateStart, $gte: filters.dateDone };
		} else if (filters.dateStart) {
			filter.addedAt = { $lte: filters.dateStart };
		} else if (filters.dateDone) {
			filter.addedAt = { $gte: filters.dateDone };
		}

		return filter;
	}
}
