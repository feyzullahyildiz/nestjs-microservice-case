import { Module } from '@nestjs/common';
import { MeController } from './me/me.controller';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AdminService } from './admin/admin.service';

@Module({
  controllers: [MeController, AuthController],
  providers: [AuthService, AdminService],
})
export class AdminModule {}
