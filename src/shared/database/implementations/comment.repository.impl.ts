import {
	Db,
	Collection,
	ObjectId,
	OptionalId,
	FindOptions,
	Filter,
	Document,
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

	async rankingOfTopics(): Promise<Document[]> {
		const pipeline = [
			{
				$group: {
					_id: '$topic',
					value: { $sum: 1 },
				},
			},
			{ $project: { _id: 0, label: '$_id', value: 1 } },
			{ $sort: { value: -1 } },
			{ $limit: 5 },
		];

		return await this.commentCollection.aggregate(pipeline).toArray();
	}

	async timeSeriesDataTopic(): Promise<Document[]> {
		const agg = [
			{
				$group: {
					_id: {
						month: {
							$dateTrunc: {
								date: '$created_at',
								unit: 'month',
							},
						},
						sentiment: '$sentiment',
					},
					total: {
						$sum: 1,
					},
				},
			},
			{
				$sort: {
					'_id.month': 1,
				},
			},
			{
				$replaceWith: {
					month: '$_id.month',
					sentiment: '$_id.sentiment',
					total: '$total',
				},
			},
		];

		return await this.commentCollection.aggregate(agg).toArray();
	}

	async commentsPerState(): Promise<any> {
		const agg = [
			{
				$group: {
					_id: '$reviewer_state',
					total: {
						$sum: 1,
					},
				},
			},
			{
				$sort: {
					_id: 1,
				},
			},
			{
				$replaceWith: {
					value: '$total',
					label: '$_id',
				},
			},
		];

		const aggregation = await this.commentCollection
			.aggregate<{ label: string | number; value: number }>(agg)
			.toArray();

		const result = {};

		aggregation.forEach((item) => {
			const key = Number.isNaN(item.label) ? 'OUTROS' : `BR-${item.label}`;
			result[key] = item.value;
		});

		return result;
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
			filter.addedAt = { $gte: filters.dateStart, $lte: filters.dateDone };
		} else if (filters.dateStart) {
			filter.addedAt = { $gte: filters.dateStart };
		} else if (filters.dateDone) {
			filter.addedAt = { $lte: filters.dateDone };
		}

		return filter;
	}
}
