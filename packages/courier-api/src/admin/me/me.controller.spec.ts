import { Test, TestingModule } from '@nestjs/testing';
import { MeController } from './me.controller';
import * as request from 'supertest';
import { AuthService } from '../auth/auth.service';
import { initTest, TestAppModule } from '../../test/test-app.module';

describe.only('MeController', () => {
  let controller: MeController;
  let authService: AuthService;
  // let app: INestApplication;
  let server: any;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TestAppModule],
    }).compile();
    const { application } = await initTest(module);
    server = application.getHttpServer();
    // controller = module.get<AuthController>(AuthController);
    // adminService = module.get<AdminService>(AdminService);
    controller = module.get<MeController>(MeController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('should not allow /admin/me without token', async () => {
    const res = await request(server).get('/admin/me');
    expect(res.status).toBe(401);
  });
  it('should allow /admin/me with token', async () => {
    const token = await authService.getAuthToken('1');
    const res = await request(server)
      .get('/admin/me')
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ message: 'hello admin' });
  });
});
