import { Module } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Courier } from '../schemas/courier.schema';
import { AdminUser } from '../schemas/admin.schema';
import { imports, controllers, providers } from './admin.module';
@Module({
  imports,
  controllers,
  providers: [
    {
      provide: getModelToken(AdminUser.name),
      useValue: {
        findOne: jest.fn(),
      },
    },
    {
      provide: getModelToken(Courier.name),
      useValue: {
        findOne: jest.fn(),
      },
    },
    ...providers,
  ],
})
export class _test_AdminModule {}
