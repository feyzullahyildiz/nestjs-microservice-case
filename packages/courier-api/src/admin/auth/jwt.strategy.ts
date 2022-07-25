import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtAdminStrategy extends PassportStrategy(Strategy, 'admin-jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET_KEY_ADMIN,
    });
  }

  // FIXME we dont send sub and username here
  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username };
  }
}
