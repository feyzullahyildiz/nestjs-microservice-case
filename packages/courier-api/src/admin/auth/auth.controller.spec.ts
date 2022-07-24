import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import * as request from 'supertest';
import { AdminService } from '../admin/admin.service';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;
  let app: INestApplication;
  let server: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdminService, AuthService],
      controllers: [AuthController],
    }).compile();
    app = module.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    server = app.getHttpServer();
    await app.init();
    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('should not allow to login with not valid email', async () => {
    const res = await request(server)
      .post('/auth/login')
      .send({ email: 'email', password: 'pass' });
    expect(res.status).toBe(400);
    expect(res.body.message).toEqual(['email must be an email']);
  });
});
