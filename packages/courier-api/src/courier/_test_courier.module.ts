import { Module } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Courier } from '../schemas/courier.schema';

import { imports, controllers, providers } from './courier.module';
@Module({
  imports,
  controllers,
  providers: [
    {
      provide: getModelToken(Courier.name),
      useValue: {
        findOne: jest.fn(),
      },
    },
    {
      provide: 'COURIER_LOCATION_RABBITMQ',
      useValue: {
        emit: jest.fn(),
      },
    },
    ...providers,
  ],
})
export class _test_CourierModule {}
