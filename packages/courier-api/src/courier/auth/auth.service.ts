import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class CourierAuthService {
  constructor(private readonly jwtService: JwtService) {}
  async getRefreshToken(userId: string) {
    return this.jwtService.signAsync(
      { userId, type: 'courier' },
      { expiresIn: '1y', secret: process.env.JWT_SECRET_REFRESH_KEY_COURIER },
    );
  }
  async getAuthToken(userId: string) {
    return this.jwtService.signAsync(
      { userId, type: 'courier' },
      { expiresIn: '10m', secret: process.env.JWT_SECRET_KEY_COURIER },
    );
  }
}
