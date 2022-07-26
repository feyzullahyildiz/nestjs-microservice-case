import { config } from 'dotenv';
config();
import { AppModule } from './app.module';

import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AdminService } from './admin/admin/admin.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
  const adminService = app.get<AdminService>(AdminService);
  await adminService.initAdminUser(
    process.env.FIRST_ADMIN_EMAIL,
    process.env.FIRST_ADMIN_PLAIN_PASSWORD,
  );
}
bootstrap();
