import { config } from 'dotenv';
config();
import { AppModule } from './app.module';

import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
