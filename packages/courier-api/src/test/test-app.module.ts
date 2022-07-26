assignEnv('JWT_SECRET_REFRESH_KEY_ADMIN', '___TEST___refresh_secret_ADMIN');
assignEnv('JWT_SECRET_REFRESH_KEY_COURIER', '___TEST___refresh_secret_COURIER');
assignEnv('JWT_SECRET_KEY_ADMIN', '___TEST___secret_ADMIN');
assignEnv('JWT_SECRET_KEY_COURIER', '___TEST___secret_COURIER');

function assignEnv(key, value) {
  process.env[key] = value;
}

import { Module, ValidationPipe } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { _test_CourierModule } from '../courier/_test_courier.module';
import { _test_AdminModule } from '../admin/_test_admin.module';
import { TestingModule } from '@nestjs/testing';

@Module({
  imports: [
    _test_AdminModule,
    _test_CourierModule,
    RouterModule.register([
      { path: 'admin', module: _test_AdminModule },
      { path: 'courier', module: _test_CourierModule },
    ]),
  ],
  controllers: [],
  providers: [
    // {
    //   provide: getModelToken(AdminUser.name),
    //   useValue: {},
    // },
  ],
})
export class TestAppModule {}

export async function initTest(module: TestingModule) {
  const application = module.createNestApplication();
  application.useGlobalPipes(new ValidationPipe());
  await application.init();
  return { application };
}
