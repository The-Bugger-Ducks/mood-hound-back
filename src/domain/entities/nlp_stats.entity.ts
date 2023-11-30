import { ObjectId } from 'mongodb';

interface IPipelineStageMetric {
	stage: string;
	time: string;
	day: Date;
}

interface ITotalOfDataMetric {
	total_of_data: number;
}

interface IModelMetric {
	model_accuracy: number;
	model_precision: number;
}

type MetricEntry = IPipelineStageMetric | ITotalOfDataMetric | IModelMetric;

interface IError {
	type: string;
	value: number;
	day?: Date;
}

export class NlpStatsMongoEntity {
	_id?: ObjectId;
	createdAt: Date;
	modelAccuracy?: number;
	modelPrecision?: number;
	totalOfData?: number;

	metrics: MetricEntry[] = [];
	erros: IError[] = [];
	errors: IError[] = [];

	stages: IPipelineStageMetric[] = []

	constructor(
		_id?: ObjectId,
		metrics: MetricEntry[] = [],
		erros: IError[] = []
	) {
		this._id = _id as unknown as ObjectId;
		this.metrics = metrics;
		this.errors = erros.flatMap((error) => error);

		this.parseMetrics();
		this.handleCreatedAt();
	}

	private parseMetrics() {
		for (const metric of this.metrics) {
			if ('stage' in metric) {
				const stageMetric = metric as IPipelineStageMetric;
				this.stages.push(stageMetric)

				if (!this.createdAt || Boolean(stageMetric.day) && this.createdAt > stageMetric.day) {
					this.createdAt = stageMetric.day
				}

			} else if ('total_of_data' in metric) {
				const totalOfDataMetric = metric as ITotalOfDataMetric;
				this.totalOfData = totalOfDataMetric.total_of_data
			} else if ('model_accuracy' in metric) {
				const modelMetric = metric as IModelMetric;
				this.modelAccuracy = modelMetric.model_accuracy
				this.modelPrecision = modelMetric.model_precision
			}
		}
	}

	private handleCreatedAt() {
		this.errors.forEach(error => {

			if (!this.createdAt || Boolean(error.day) && this.createdAt > error.day) {
				this.createdAt = error.day
			}
		})
	}
}


export class NlpStatsEntity {
	id: string;
	createdAt: Date
	modelAccuracy: number
	modelPrecision: number
	totalOfData: number

	stages: IPipelineStageMetric[]
	errors: IError[]


	constructor(data: Partial<NlpStatsMongoEntity>) {
		this.id = data._id.toString();
		this.createdAt = data.createdAt;
		this.modelAccuracy = data.modelAccuracy;
		this.modelPrecision = data.modelPrecision;
		this.totalOfData = data.totalOfData;

		this.errors = data.errors;
		this.stages = data.stages;
	}
}

