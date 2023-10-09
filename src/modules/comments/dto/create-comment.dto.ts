import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { CommentSentimentEnum } from '../entities/comment.entity';

export class CreateCommentDto {
	@IsString()
	@IsNotEmpty()
	productId: string;

	@IsString()
	@IsNotEmpty()
	productName: string;

	@IsString()
	@IsNotEmpty()
	text: string;

	@IsString()
	@IsNotEmpty()
	topic: string;

	@IsString()
	@IsEnum(CommentSentimentEnum)
	@IsNotEmpty()
	sentiment: CommentSentimentEnum;
}
