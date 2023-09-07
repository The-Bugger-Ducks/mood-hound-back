import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

export const ApiTagsAndBearerAuth = (...tags: string[]) =>
	applyDecorators(ApiBearerAuth(), ApiTags(...tags));
