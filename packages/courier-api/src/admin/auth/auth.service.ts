import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  async getRefreshToken(userId: string) {
    return Promise.resolve(`${userId}___refresh_token`);
  }
  async getAuthToken(userId: string) {
    return Promise.resolve(`${userId}___auth_token`);
  }
}
