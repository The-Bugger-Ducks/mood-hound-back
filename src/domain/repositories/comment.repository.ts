import { IGenericRepository } from '../abstractions/generic-repository.abstract';
import { CommentEntity } from '../entities/comment.entity';

export interface CommentRepository extends IGenericRepository<CommentEntity> {
	findMany(where: Partial<CommentEntity>): Promise<CommentEntity[]>;
}
