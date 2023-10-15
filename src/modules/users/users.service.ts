import { ConflictException, Injectable } from '@nestjs/common';

import { hash } from 'bcryptjs';

import { DatabaseService } from './../../shared/database/services/database.service';

import { UserRoleEnum } from '../../domain/entities/user.entity';

import {
	CreateUserDto,
	UpdateUserDto,
	UpdateUserRoleDto,
} from '../../domain/dtos';

@Injectable()
export class UsersService {
	constructor(private readonly databaseService: DatabaseService) { }

	getUserById(userId: string) {
		return this.databaseService.users.findOne(userId);
	}

	search(
		userId: string,
		filters: {
			name?: string;
			email?: string;
			role?: UserRoleEnum;
		},
	) {
		return this.databaseService.users.findMany({
			id: userId,
			name: filters.name,
			email: filters.email,
			role: filters.role,
		});
	}

	async create(createUserDto: CreateUserDto) {
		const { name, role, email, password } = createUserDto;

		const emailTaken = await this.databaseService.users.findByEmail(email);

		if (emailTaken) {
			throw new ConflictException('This email is already in use.');
		}

		const hashedPassword = await hash(password, 12);

		return this.databaseService.users.create({
			name,
			email,
			password: hashedPassword,
			role,
		});
	}

	async update(userId: string, updateUserDto: UpdateUserDto) {
		if (updateUserDto.password) {
			const password = await hash(updateUserDto.password, 12);

			updateUserDto.password = password;
		}

		await this.databaseService.users.update(userId, updateUserDto);

		return null;
	}

	async updateRole(updateRoleUserDto: UpdateUserRoleDto) {
		const { userId, role } = updateRoleUserDto;

		await this.databaseService.users.updateRole(userId, role);

		return null;
	}

	async remove(userId: string) {
		await this.databaseService.users.delete(userId);

		return null;
	}
}
