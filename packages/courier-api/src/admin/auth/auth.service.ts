import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}
  async getRefreshToken(userId: string) {
    return this.jwtService.signAsync(
      { userId, type: 'admin' },
      { expiresIn: '1y' },
    );
  }
  async getAuthToken(userId: string) {
    return this.jwtService.signAsync(
      { userId, type: 'admin' },
      { expiresIn: '10m' },
    );
  }
}
