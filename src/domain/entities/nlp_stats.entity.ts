import { ObjectId } from 'mongodb';

interface IExecutionTimes {
	acessExecTime: string,
	clearExecTime: string,
	trainingModelExecTime: string
}

interface IAdaptation {
	priorAdaptation: number[],
	afterAdaptation: number[],
}

interface IClearDataStatistics {
	formatOfTheDataset: IAdaptation,
	nullEvaluations: IAdaptation,
	duplicateRecords: IAdaptation,
}

interface IConfusionMatrix {
	truePositive: number
	falsePositive: number
	falseNegative: number
	trueNegative: number
	neutralNeutral: number
	neutralNegative: number
	neutralPositive: number
}

export class NlpStatsMongoEntity {
	_id?: ObjectId;
	created_at: Date;
	model_accuracy: number;
	model_precision: number;

	execution_times: {
		acess_exec_time: string,
		clear_exec_time: string,
		training_model_exec_time: string
	};
	clear_data_statistics: {
		format_of_the_dataset: {
			prior_adaptation: number[],
			after_adaptation: number[],
		},
		null_evaluations: {
			prior_adaptation: number[],
			after_adaptation: number[],
		},
		duplicate_records: {
			prior_adaptation: number[],
			after_adaptation: number[],
		}
	};
	confusion_matrix: {
		true_positive: number
		false_positive: number
		false_negative: number
		true_negative: number
		neutral_neutral: number
		neutral_negative: number
		neutral_positive: number
	}
}

export class NlpStatsEntity {
	id: string;
	createdAt: Date
	modelAccuracy: number
	modelPrecision: number
	executionTimes: IExecutionTimes
	clearDataStatistics: IClearDataStatistics
	confusionMatrix: IConfusionMatrix

	constructor(data: Partial<NlpStatsMongoEntity>) {
		this.id = data._id.toString();
		this.createdAt = data.created_at;
		this.modelAccuracy = data.model_accuracy;
		this.modelPrecision = data.model_precision;

		this.executionTimes.acessExecTime = data.execution_times.acess_exec_time;
		this.executionTimes.clearExecTime = data.execution_times.clear_exec_time;
		this.executionTimes.trainingModelExecTime = data.execution_times.training_model_exec_time;

		this.clearDataStatistics.duplicateRecords.afterAdaptation = data.clear_data_statistics.duplicate_records.after_adaptation
		this.clearDataStatistics.duplicateRecords.priorAdaptation = data.clear_data_statistics.duplicate_records.prior_adaptation

		this.clearDataStatistics.formatOfTheDataset.afterAdaptation = data.clear_data_statistics.format_of_the_dataset.after_adaptation
		this.clearDataStatistics.formatOfTheDataset.priorAdaptation = data.clear_data_statistics.format_of_the_dataset.prior_adaptation

		this.clearDataStatistics.nullEvaluations.afterAdaptation = data.clear_data_statistics.null_evaluations.after_adaptation
		this.clearDataStatistics.nullEvaluations.priorAdaptation = data.clear_data_statistics.null_evaluations.prior_adaptation

		this.confusionMatrix.falseNegative = data.confusion_matrix.false_negative
		this.confusionMatrix.falsePositive = data.confusion_matrix.false_positive
		this.confusionMatrix.neutralNegative = data.confusion_matrix.neutral_negative
		this.confusionMatrix.neutralNeutral = data.confusion_matrix.neutral_neutral
		this.confusionMatrix.neutralPositive = data.confusion_matrix.neutral_positive
		this.confusionMatrix.trueNegative = data.confusion_matrix.true_negative
		this.confusionMatrix.truePositive = data.confusion_matrix.true_positive
	}
}

