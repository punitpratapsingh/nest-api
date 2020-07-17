import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
dotenv.config();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
/*
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: true,
    }),
  );

  */
const options = new DocumentBuilder()
    .setTitle('School api')
    .setDescription('This is school api')
    .setVersion('1.0')
    .addTag('books')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);



  await app.listen(process.env.PORT);
}
bootstrap();
