import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

interface TokenPayload {
  userId: string;
  type: string;
}
@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}
  async getRefreshToken(userId: string) {
    return this.jwtService.signAsync(
      { userId, type: 'admin' },
      { expiresIn: '1y', secret: process.env.JWT_SECRET_REFRESH_KEY_ADMIN },
    );
  }
  async getAuthToken(userId: string) {
    return this.jwtService.signAsync(
      { userId, type: 'admin' },
      { expiresIn: '10m', secret: process.env.JWT_SECRET_KEY_ADMIN },
    );
  }
  async resolveRefreshToken(token: string): Promise<TokenPayload> {
    return this.jwtService.verify(token, {
      secret: process.env.JWT_SECRET_REFRESH_KEY_ADMIN,
    });
  }
}
