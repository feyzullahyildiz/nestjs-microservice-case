assignEnv('JWT_SECRET_REFRESH_KEY_ADMIN', 'refresh_secret_ADMIN');
assignEnv('JWT_SECRET_REFRESH_KEY_COURIER', 'refresh_secret_COURIER');
assignEnv('JWT_SECRET_KEY_ADMIN', 'secret_ADMIN');
assignEnv('JWT_SECRET_KEY_COURIER', 'secret_COURIER');

function assignEnv(key, defaultValue) {
  process.env[key] = process.env[key] || defaultValue;
}

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
  providers: [
    AppService,
    // {
    //   provide: 'ADMIN_SECRET_KEY',
    //   useValue: secretKey + '_ADMIN_',
    // },
    // {
    //   provide: 'COURIER_SECRET_KEY',
    //   useValue: secretKey,
    // },
  ],
})
export class AppModule {}
