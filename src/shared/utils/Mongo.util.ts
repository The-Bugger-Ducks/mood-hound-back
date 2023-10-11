import { ObjectId } from 'mongodb';

export class MongoUtils {
	static stringToObjectID(data: string): ObjectId {
		if (this.isValidObjectId(data)) {
			return new ObjectId(data);
		}
	}

	static objectIDToString(data: ObjectId) {
		if (this.isValidObjectId(data)) {
			return data.toString();
		}
	}

	static convertEntityMongo(document: any) {
		if (document?._id !== undefined) {
			const { _id, ...data } = document;

			return { ...data, id: this.objectIDToString(_id) };
		}

		return document;
	}

	static convertEntityMongoList(documents: any[]) {
		return documents.map((document) => this.convertEntityMongo(document));
	}

	static isValidObjectId(data: ObjectId | string) {
		return ObjectId.isValid(data);
	}
}
