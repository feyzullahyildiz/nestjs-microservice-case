import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CourierModule } from './courier/courier.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    AdminModule,
    CourierModule,
    RouterModule.register([
      { path: 'admin', module: AdminModule },
      { path: 'courier', module: CourierModule },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
