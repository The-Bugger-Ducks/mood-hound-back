import { ConflictException, Injectable } from '@nestjs/common';

import { hash } from 'bcryptjs';

import { UsersRepository } from 'src/shared/database/repositories/users.repositories';

import { RoleEnum } from './entities/users.entity';

import { CreateUserDto } from './dto/create.user.dto';
import { UpdateUserDto } from './dto/update.user.dto';
import { UpdateUserRoleDto } from './dto/update.userRole.dto';

@Injectable()
export class UsersService {
	constructor(private readonly usersRepo: UsersRepository) {}

	getUserById(userId: string) {
		return this.usersRepo.findUnique({
			where: { id: userId },
			select: { name: true, email: true, role: true },
		});
	}

	search(
		userId: string,
		filters: {
			name?: string;
			email?: string;
			role?: RoleEnum;
		},
	) {
		return this.usersRepo.findMany({
			where: {
				id: { not: userId },
				name: { contains: filters.name },
				email: { contains: filters.email },
				role: { equals: filters.role },
			},
			select: {
				id: true,
				email: true,
				name: true,
				role: true,
			},
		});
	}

	async create(createUserDto: CreateUserDto) {
		const { name, role, email, password } = createUserDto;

		const emailTaken = await this.usersRepo.findUnique({
			where: { email },
			select: { id: true },
		});

		if (emailTaken) {
			throw new ConflictException('This email is already in use.');
		}

		const hashedPassword = await hash(password, 12);

		return this.usersRepo.create({
			data: {
				name: name,
				email: email,
				password: hashedPassword,
				role: role,
			},
			select: {
				id: true,
				name: true,
				email: true,
				role: true,
			},
		});
	}

	async update(userId: string, updateUserDto: UpdateUserDto) {
		if (updateUserDto.password) {
			const password = await hash(updateUserDto.password, 12);

			updateUserDto.password = password;
		}

		await this.usersRepo.update({
			where: { id: userId },
			data: updateUserDto,
		});

		return null;
	}

	async updateRole(updateRoleUserDto: UpdateUserRoleDto) {
		const { userId, role } = updateRoleUserDto;

		await this.usersRepo.update({
			where: { id: userId },
			data: {
				role: role,
			},
		});

		return null;
	}

	async remove(userId: string) {
		await this.usersRepo.delete({
			where: {
				id: userId,
			},
		});

		return null;
	}
}
