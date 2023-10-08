import { BadRequestException, PipeTransform } from '@nestjs/common';

import { MongoUtils } from '../utils/Mongo.util';

export class ParseObjectIDPipe implements PipeTransform<string> {
	transform(value: string) {
		if (!MongoUtils.isValidObjectId(value)) {
			throw new BadRequestException('ObjectID is not valid');
		}

		return MongoUtils.stringToObjectID(value);
	}
}
