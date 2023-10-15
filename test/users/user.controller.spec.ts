import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../../src/modules/auth/auth.service';
import { forwardRef } from '@nestjs/common';
import { AuthModule } from '../../src/modules/auth/auth.module';
import { UsersController } from '../../src/modules/users/users.controller';
import { UsersService } from '../../src/modules/users/users.service';
import { UsersModule } from '../../src/modules/users/users.module';
import { UserRoleEnum } from '../../src/domain/entities/user.entity';
import { DatabaseService } from '../../src/shared/database/services/database.service';
import { CreateUserDto } from '../../src/domain/dtos/user/create.user.dto';
import { DatabaseModule } from '../../src/shared/database/database.module';

const mockUsers = [
	{
		id: 'asdasd',
		name: 'John',
		email: 'johndoe@test.com',
		password: '123456',
		role: UserRoleEnum.ADMIN,
	},
	{
		id: 'asdas',
		name: 'Jane',
		email: 'janedoe@test.com',
		password: '123456',
		role: UserRoleEnum.VIEWER,
	},
];

describe('User', () => {
	let usersController: UsersController;
	let databaseService: DatabaseService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [forwardRef(() => AuthModule), UsersModule, DatabaseModule],
			controllers: [UsersController],
			providers: [UsersService, DatabaseService, AuthService],
		}).compile();

		usersController = module.get<UsersController>(UsersController);
		databaseService = module.get<DatabaseService>(DatabaseService);
	});

	afterEach(async () => await databaseService.onModuleDestroy());

	// afterAll(async () => await databaseService.users.deleteMany());

	it('should be defined', () => {
		expect(usersController).toBeDefined();
		expect(databaseService).toBeDefined();
	});

	// it('should return a list of users', async () => {
	// 	// Mockando o serviço de usuário para que retorne a lista de usuários que definimos acima.
	// 	jest.spyOn(usersController, 'search').mockImplementation();
	// 	// Fazendo uma requisição GET para a rota de busca de usuários.
	// 	const response = await usersController.search(
	// 		'6514b0ce34a6b1aa0a4a49b2',
	// 	);
	// 	// Verificando se o resultado da resposta é igual à lista de usuários que definimos acima.
	// 	expect(response).toEqual(mockUsers);
	// });

	it('should to create and delete the Jest user', async () => {
		const user: CreateUserDto = {
			name: 'Jest',
			email: 'jest@test.com',
			password: '1231231234',
			role: UserRoleEnum.VIEWER,
		};

		await usersController.create(user);

		const createdUser = await databaseService.users.findByEmail(user.email);
		expect(createdUser).toBeDefined();

		await usersController.delete(createdUser.id);
		// Verifica se o usuário foi removido do banco de dados.
		const deletedUser = await databaseService.users.findOne(createdUser.id);

		expect(deletedUser).toBeNull();
	});
});
