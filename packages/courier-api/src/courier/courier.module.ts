import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { CourierAuthService } from './auth/courier_auth.service';
import { JwtCourierAuthGuard } from './auth/jwt.guard';
import { JwtCourierStrategy } from './auth/jwt.strategy';
import { CourierService } from './courier.service';
import { CourierMeController } from './me/me.controller';
import { Courier, CourierSchema } from '../schemas/courier.schema';
import { MongooseModule } from '@nestjs/mongoose';
export const imports = [JwtModule.register({})];
export const controllers = [CourierMeController];
export const providers = [
  JwtCourierStrategy,
  JwtCourierAuthGuard,
  CourierAuthService,
  CourierService,
];
@Module({
  imports: [
    ...imports,
    MongooseModule.forFeature([
      {
        name: Courier.name,
        schema: CourierSchema,
      },
    ]),
  ],
  controllers,
  providers,
})
export class CourierModule {}
