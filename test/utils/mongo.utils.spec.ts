import { MongoUtils } from '../../src/shared/utils/Mongo.util';

describe('User', () => {
	it('should be valid ObjectID', () => {
		const isValidObjectId = MongoUtils.isValidObjectId('6514b0ce34a6b1aa0a4a49b2');
		expect(isValidObjectId).toBeTruthy();
	});

	it('should not be valid ObjectID', () => {
		const isNotValidObjectId = MongoUtils.isValidObjectId('teste');
		expect(isNotValidObjectId).toBeFalsy();
	});
});
