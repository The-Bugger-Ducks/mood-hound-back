import { IGenericRepository } from 'src/domain/abstractions/generic-repository.abstract';

import { UserEntity, UserRoleEnum } from 'src/domain/entities/user.entity';

export interface UserRepository extends IGenericRepository<UserEntity> {
	findMany(where: Partial<UserEntity>): Promise<UserEntity[]>;

	findByEmail(email: string): Promise<UserEntity>;

	update(id: string, user: Partial<UserEntity>): Promise<void>;

	updateRole(id: string, role: keyof typeof UserRoleEnum): Promise<void>;

	delete(id: string): Promise<void>;
}
