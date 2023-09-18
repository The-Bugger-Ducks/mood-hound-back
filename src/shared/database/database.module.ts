import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { UsersRepository } from './repositories/users.repositories';
import { CommentsRepository } from './repositories/comments.repositories';

@Global()
@Module({
	providers: [PrismaService, UsersRepository, CommentsRepository],
	exports: [UsersRepository, CommentsRepository],
})
export class DatabaseModule {}
