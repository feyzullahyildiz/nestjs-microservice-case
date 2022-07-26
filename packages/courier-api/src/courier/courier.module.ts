import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { CourierAuthService } from './auth/auth.service';
import { JwtCourierAuthGuard } from './auth/jwt.guard';
import { JwtCourierStrategy } from './auth/jwt.strategy';
import { CourierMeController } from './me/me.controller';

export const imports = [JwtModule.register({})];
export const controllers = [CourierMeController];
export const providers = [
  JwtCourierStrategy,
  JwtCourierAuthGuard,
  CourierAuthService,
];
@Module({
  imports,
  controllers,
  providers,
})
export class CourierModule {}
