import { Injectable, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AdminUser, AdminUserDocument } from '../../schemas/admin.schema';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(AdminUser.name) private adminModel: Model<AdminUserDocument>,
  ) {}
  async getWithEmailAndPassword(email: string, password: string) {
    return {
      id: '123123',
      email,
    };
  }
  async isUserAvailable(userid: string) {
    // TODO check user active state
    return Promise.resolve(true);
  }
  async updateUserRefreshToken(userid: string, refreshToken: string) {
    return Promise.resolve(true);
  }
  async getUserByRefreshToken(refreshToken: string) {
    return Promise.resolve({
      id: '123123',
      email: 'a@b.com',
    });
  }
}
