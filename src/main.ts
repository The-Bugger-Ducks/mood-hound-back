import 'dotenv/config';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.useGlobalPipes(new ValidationPipe());
	app.enableCors({
		origin: '*',
	});

	const config = new DocumentBuilder()
		.setTitle('Mood Hound API')
		.setDescription('MoodHound Service')
		.setVersion('1.0')
		.setContact(
			'Suporte',
			'https://fatecsjc-prd.azurewebsites.net/',
			'thebugger.duck.labs@gmail.com',
		)
		.addBearerAuth()
		.addSecurityRequirements('bearer')
		.build();

	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('api', app, document);

	await app.listen(3000);
}
bootstrap();
