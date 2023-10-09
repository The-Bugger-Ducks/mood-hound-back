import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { DatabaseService } from 'src/shared/database/services/database.service';

@Module({
	controllers: [CommentsController],
	providers: [CommentsService, DatabaseService],
})
export class CommentsModule {}
