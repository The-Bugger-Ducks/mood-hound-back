import { ArgumentMetadata, ParseEnumPipe } from '@nestjs/common';

export class OptionalParseEnumPipe<T = any> extends ParseEnumPipe<T> {
	override transform(value: T, metadata: ArgumentMetadata) {
		return super.transform(value, metadata);
	}
}
