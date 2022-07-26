import { Test, TestingModule } from '@nestjs/testing';
import { CourierMeController } from './me.controller';
import * as request from 'supertest';
import { CourierAuthService } from '../auth/courier_auth.service';
import { initTest, TestAppModule } from '../../test/test-app.module';

describe('MeController', () => {
  let controller: CourierMeController;
  let authService: CourierAuthService;
  let server: any;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TestAppModule],
    }).compile();
    const { application } = await initTest(module);
    server = application.getHttpServer();
    controller = module.get<CourierMeController>(CourierMeController);
    authService = module.get<CourierAuthService>(CourierAuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('should not allow /courier/me without token', async () => {
    const res = await request(server).get('/courier/me');
    expect(res.status).toBe(401);
  });
  it('should allow /courier/me with token', async () => {
    const token = await authService.getAuthToken('1');
    const res = await request(server)
      .get('/courier/me')
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ message: 'hello courier' });
  });
});
