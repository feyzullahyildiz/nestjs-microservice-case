import { Injectable } from '@nestjs/common';

@Injectable()
export class AdminService {
  async getWithEmailAndPassword(email: string, password: string) {
    return {
      id: '123123',
      email,
    };
  }
}
