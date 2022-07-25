import { Module } from '@nestjs/common';
import { MeController } from './me/me.controller';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AdminService } from './admin/admin.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtAdminStrategy } from './auth/jwt.strategy';
import { JwtAdminAuthGuard } from './auth/jwt.guard';

@Module({
  imports: [JwtModule.register({})],
  controllers: [MeController, AuthController],
  providers: [AuthService, AdminService, JwtAdminAuthGuard, JwtAdminStrategy],
})
export class AdminModule {}
