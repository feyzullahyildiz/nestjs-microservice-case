import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { CourierAuthService } from './auth/auth.service';
import { JwtCourierAuthGuard } from './auth/jwt.guard';
import { JwtCourierStrategy } from './auth/jwt.strategy';
import { CourierMeController } from './me/me.controller';

@Module({
  imports: [JwtModule.register({})],
  controllers: [CourierMeController],
  providers: [JwtCourierStrategy, JwtCourierAuthGuard, CourierAuthService],
})
export class CourierModule {}
