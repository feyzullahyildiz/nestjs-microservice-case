import { Module } from '@nestjs/common';
import { CourierMeController } from './me/me.controller';

@Module({
  controllers: [CourierMeController],
})
export class CourierModule {}
