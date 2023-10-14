import { ObjectId } from 'mongodb';

export enum CommentSentimentEnum {
	POSITIVE = 'POSITIVO',
	NEGATIVE = 'NEGATIVO',
	NEUTRAL = 'NEUTRO',
}

export enum CommentTopicEnum {
	QUALITY = 'QUALIDADE',
	RECEIVEMENT = 'RECEBIMENTO',
	SATISFIED = 'SATISFEITO',
	DELIVERY = 'ENTREGA',
	RECOMMENDATION = 'RECOMENDACAO',
	EXPECTATION = 'EXPECTATIVA',
	COSTBENEFIT = 'CUSTO_BENEFICIO',
	OTHERS = 'OUTROS',
}

export type CommentMongoEntity = {
	_id?: ObjectId;
	product_id: string;
	product_name: string;
	text: string;
	topic: string;
	sentiment: CommentSentimentEnum;
	reviewer_state: string;
	created_at: Date;
	processed_at: Date;
};

export class CommentEntity {
	id: string;
	productId: string;
	productName: string;
	text: string;
	topic: string;
	sentiment: CommentSentimentEnum;
	reviewerState: string;
	createdAt: Date;
	processedAt: Date;

	constructor(data: Partial<CommentMongoEntity>) {
		this.id = data._id.toString();
		this.productId = data.product_id;
		this.productName = data.product_name;
		this.text = data.text;
		this.topic = data.topic;
		this.sentiment = data.sentiment;
		this.reviewerState = data.reviewer_state;
		this.createdAt = data.created_at;
		this.processedAt = data.processed_at;
	}
}
