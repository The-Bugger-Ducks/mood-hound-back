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
