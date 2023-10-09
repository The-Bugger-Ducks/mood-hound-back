import { CommentEntity, UserEntity } from '../../domain/entities';

import { IGenericRepository } from './generic-repository.abstract';

export abstract class IDataServices {
	abstract users: IGenericRepository<UserEntity>;
	abstract comments: IGenericRepository<CommentEntity>;
}
