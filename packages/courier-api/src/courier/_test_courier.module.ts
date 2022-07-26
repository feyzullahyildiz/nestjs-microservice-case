import { Module } from '@nestjs/common';

import { imports, controllers, providers } from './courier.module';
@Module({
  imports,
  controllers,
  providers,
})
export class _test_CourierModule {}
