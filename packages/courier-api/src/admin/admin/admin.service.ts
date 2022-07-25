import { Injectable } from '@nestjs/common';

@Injectable()
export class AdminService {
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
