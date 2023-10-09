import * as dotenv from 'dotenv';
import { hash } from 'bcryptjs';
import { PrismaClient, UserRole } from '@prisma/client';

import { users } from '../mocks/user.mock';

const prisma = new PrismaClient();

async function main() {
	dotenv.config();

	for (let userIndex = 0; userIndex < users.length; userIndex++) {
		const user = users[userIndex];

		const hashedPassword = await hash(user.password, 12);
		user.password = hashedPassword;

		await prisma.user.create({
			data: {
				email: user.email,
				name: user.name,
				password: user.password,
				role: user.role === 'ADMIN' ? UserRole.ADMIN : UserRole.VIEWER,
			},
		});
	}
}

main()
	.catch((e) => console.error(e))
	.finally(async () => {
		await prisma.$disconnect();
	});
