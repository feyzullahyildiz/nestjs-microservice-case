import { Module } from '@nestjs/common';
import { MeController } from './me/me.controller';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AdminService } from './admin/admin.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtAdminStrategy } from './auth/jwt.strategy';
import { JwtAdminAuthGuard } from './auth/jwt.guard';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminUser, AdminUserSchema } from '../schemas/admin.schema';
import { CourierService } from '../courier/courier.service';
import { Courier, CourierSchema } from '../schemas/courier.schema';
import { CourierController } from './courier/courier.controller';

export const imports = [JwtModule.register({})];
export const controllers = [MeController, AuthController];
export const providers = [
  AuthService,
  AdminService,
  CourierService,
  JwtAdminAuthGuard,
  JwtAdminStrategy,
];
@Module({
  imports: [
    ...imports,
    MongooseModule.forFeature([
      {
        name: AdminUser.name,
        schema: AdminUserSchema,
      },
      {
        name: Courier.name,
        schema: CourierSchema,
      },
    ]),
  ],
  controllers,
  providers,
})
export class AdminModule {}
