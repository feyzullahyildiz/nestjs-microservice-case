import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { CourierAuthService } from './auth/courier_auth.service';
import { JwtCourierAuthGuard } from './auth/jwt.guard';
import { JwtCourierStrategy } from './auth/jwt.strategy';
import { CourierService } from './courier.service';
import { CourierMeController } from './me/me.controller';
import { Courier, CourierSchema } from '../schemas/courier.schema';
import { MongooseModule } from '@nestjs/mongoose';

import {} from 'amqp-connection-manager';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CourierController } from './auth/auth.controller';

export const imports = [JwtModule.register({})];
export const controllers = [CourierMeController, CourierController];
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
    ClientsModule.register([
      {
        name: 'COURIER_LOCATION_RABBITMQ',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_CONNECTION],
          queue: 'location-update',
        },
      },
    ]),
  ],
  controllers,
  providers,
})
export class CourierModule {}
