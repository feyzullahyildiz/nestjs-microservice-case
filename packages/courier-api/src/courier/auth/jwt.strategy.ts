import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtCourierStrategy extends PassportStrategy(
  Strategy,
  'courier-jwt',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET_KEY_COURIER,
    });
  }

  async validate<T>(payload: T): Promise<T> {
    // I dont understand what this function does.
    // I think, this will be in our req.user property
    // In this way, we pass jwt payload to req.user
    return payload;
  }
}
