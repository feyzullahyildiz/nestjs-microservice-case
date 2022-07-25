import { Module } from '@nestjs/common';
import { MeController } from './me/me.controller';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AdminService } from './admin/admin.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../auth/jwt.service';
import { JwtAdminAuthGuard } from '../auth/jwt.auth-guard';

@Module({
  imports: [
    JwtModule.register({
      secret: 'secret',
    }),
  ],
  controllers: [MeController, AuthController],
  providers: [AuthService, AdminService, JwtAdminAuthGuard, JwtStrategy],
})
export class AdminModule {}
