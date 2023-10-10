import { Test, TestingModule } from '@nestjs/testing';
import { RoleEnum } from '../../src/modules/users/entities/users.entity';
import { AuthService } from '../../src/modules/auth/auth.service';
import { forwardRef } from '@nestjs/common';
import { AuthModule } from '../../src/modules/auth/auth.module';
import { UsersController } from '../../src/modules/users/users.controller';
import { PrismaService } from '../../src/shared/database/prisma.service';
import { UsersService } from '../../src/modules/users/users.service';
import { CreateUserDto } from '../../src/modules/users/dto/create.user.dto';
import { UsersModule } from '../../src/modules/users/users.module';
import { User } from '@prisma/client';

const mockUsers: User[] = [
	{
		id: 'asdasd',
		name: 'John',
		email: 'johndoe@test.com',
		password: '123456',
		role: RoleEnum.ADMIN,
	},
	{
		id: 'asdas',
		name: 'Jane',
		email: 'janedoe@test.com',
		password: '123456',
		role: RoleEnum.VIEWER,
	},
];

describe('User', () => {
	let controller: UsersController;
	let prismaService: PrismaService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [forwardRef(() => AuthModule), UsersModule],
			controllers: [UsersController],
			providers: [UsersService, PrismaService, AuthService],
		}).compile();

		controller = module.get<UsersController>(UsersController);
		prismaService = module.get<PrismaService>(PrismaService);
	});

	afterEach(async () => await prismaService.$disconnect());

	afterAll(async () => await prismaService.user.deleteMany());

	it('should be defined', () => {
		expect(controller).toBeDefined();
		expect(prismaService).toBeDefined();
	});

	it('should return a list of users', async () => {
		// Mockando o serviço de usuário para que retorne a lista de usuários que definimos acima.
		jest.spyOn(controller, 'search').mockImplementation();
		// Fazendo uma requisição GET para a rota de busca de usuários.
		const response = await controller.search(
			'6514b0ce34a6b1aa0a4a49b2',
			undefined,
			undefined,
			RoleEnum.ADMIN,
		);
		// Verificando se o resultado da resposta é igual à lista de usuários que definimos acima.
		expect(response).toEqual(mockUsers);
	});

	it('should to create and delete the Jest user', async () => {
		const user: CreateUserDto = {
			name: 'Jest',
			email: 'jest@test.com',
			password: '123456',
			role: RoleEnum.VIEWER,
		};

		const createUserResponse = await controller.create(user);

		expect(createUserResponse.name).toEqual(user.name);
		expect(createUserResponse.email).toEqual(user.email);
		expect(createUserResponse.role).toEqual(user.role);


		await controller.delete(createUserResponse.id);
		// Verifica se o usuário foi removido do banco de dados.
		const deletedUser = await prismaService.user.findUnique({
			where: { id: createUserResponse.id },
		});

		expect(deletedUser).toBeNull();
	});
});
