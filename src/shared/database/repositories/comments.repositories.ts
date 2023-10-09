import { Injectable } from '@nestjs/common';
import { type Prisma } from '@prisma/client';

import { PrismaService } from '../prisma.service';

@Injectable()
export class CommentsRepository {
	constructor(private readonly prismaService: PrismaService) {}

	create(createDto: Prisma.CommentCreateArgs) {
		return this.prismaService.comment.create(createDto);
	}

	findMany(findManyDto: Prisma.CommentFindManyArgs) {
		return this.prismaService.comment.findMany(findManyDto);
	}
}
