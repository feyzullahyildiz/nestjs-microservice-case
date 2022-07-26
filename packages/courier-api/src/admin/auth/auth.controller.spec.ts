import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import * as request from 'supertest';
import { AdminService } from '../admin/admin.service';
import { initTest, TestAppModule } from '../../test/test-app.module';

describe('AuthController', () => {
  let adminService: AdminService;
  let controller: AuthController;
  // let app: INestApplication;
  let server: any;
  let authToken: string;
  let refreshToken: string;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TestAppModule],
    }).compile();
    const { application } = await initTest(module);
    server = application.getHttpServer();

    controller = module.get<AuthController>(AuthController);
    adminService = module.get<AdminService>(AdminService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('should not allow to login with not valid email', async () => {
    const res = await request(server)
      .post('/admin/auth/login')
      .send({ email: 'email', password: 'pass' });
    expect(res.status).toBe(400);
    expect(res.body.message).toEqual(['email must be an email']);
  });
  it('should not login if credentials does not match', async () => {
    jest
      .spyOn(adminService, 'getWithEmailAndPassword')
      .mockImplementation(() => Promise.resolve(null));
    jest
      .spyOn(adminService, 'updateUserRefreshToken')
      .mockImplementation(() => Promise.resolve(true));

    const res = await request(server)
      .post('/admin/auth/login')
      .send({ email: 'a@b.com', password: 'passpass' });
    expect(res.status).toBe(401);

    expect(res.body).not.toHaveProperty('token');
    expect(res.body).not.toHaveProperty('refreshToken');
    expect(adminService.getWithEmailAndPassword).toBeCalledTimes(1);
    expect(adminService.updateUserRefreshToken).toBeCalledTimes(0);
  });
  it('should login with valid credentials', async () => {
    jest.spyOn(adminService, 'getWithEmailAndPassword').mockImplementation(() =>
      Promise.resolve({
        id: '11',
        email: 'a@b.com',
      }),
    );
    jest
      .spyOn(adminService, 'updateUserRefreshToken')
      .mockImplementation(() => Promise.resolve(true));

    const res = await request(server)
      .post('/admin/auth/login')
      .send({ email: 'a@b.com', password: 'passpass' });
    expect(res.status).toBe(201);

    expect(res.body).toHaveProperty('token');
    expect(res.body).toHaveProperty('refreshToken');
    authToken = res.body.token;
    refreshToken = res.body.refreshToken;
    expect(adminService.getWithEmailAndPassword).toBeCalledTimes(1);
    expect(adminService.updateUserRefreshToken).toBeCalledTimes(1);
  });
  it('should throw error if refresh token not found', async () => {
    jest
      .spyOn(adminService, 'getUserByRefreshToken')
      .mockImplementation(() => Promise.resolve(null));
    const res = await request(server)
      .post('/admin/auth/refresh')
      .send({ refreshToken });
    expect(res.status).toBe(401);

    expect(res.body).not.toHaveProperty('token');
    expect(adminService.getUserByRefreshToken).toBeCalledTimes(1);
    expect(adminService.getUserByRefreshToken).toBeCalledWith(refreshToken);
  });
  it('should get new token by refresh token', async () => {
    jest.spyOn(adminService, 'getUserByRefreshToken').mockImplementation(() =>
      Promise.resolve({
        id: '11',
        email: 'a@b.com',
      }),
    );
    const res = await request(server)
      .post('/admin/auth/refresh')
      .send({ refreshToken });
    expect(res.status).toBe(201);

    expect(res.body).toHaveProperty('token');
    expect(adminService.getUserByRefreshToken).toBeCalledTimes(1);
    expect(adminService.getUserByRefreshToken).toBeCalledWith(refreshToken);
  });
});
