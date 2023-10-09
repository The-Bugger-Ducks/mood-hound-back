import { Db, Collection, ObjectId, OptionalId } from 'mongodb';

import { CommentEntity } from 'src/domain/entities';
import { CommentRepository } from 'src/domain/repositories';
import { CreateCommentDto, FilterCommentDto } from 'src/domain/dtos';

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

	async findMany(filter: FilterCommentDto): Promise<CommentEntity[]> {
		return;
	}

	async findOne(id: string): Promise<CommentEntity> {
		return;
	}

	async create(createCommentDto: CreateCommentDto): Promise<void> {
		return;
	}
}
