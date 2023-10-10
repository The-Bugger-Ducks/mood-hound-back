export enum CommentSentimentEnum {
	POSITIVE = 'POSITIVO',
	NEGATIVE = 'NEGATIVO',
	NEUTRAL = 'NEUTRO',
}

export enum CommentTopicEnum {
	QUALITY = 'QUALITY',
	RECEIVEMENT = 'RECEIVEMENT',
	SATISFIED = 'SATISFIED',
	DELIVERY = 'DELIVERY',
	RECOMMENDATION = 'RECOMMENDATION',
	EXPECTATION = 'EXPECTATION',
	COSTBENEFIT = 'COSTBENEFIT',
	OTHERS = 'OTHERS',
}

export class CommentEntity {
	id: string;
	productId: string;
	productName: string;
	text: string;
	topic: string;
	sentiment: CommentSentimentEnum;
	rating: number;
	createdAt: Date;
	addedAt: Date;
}
