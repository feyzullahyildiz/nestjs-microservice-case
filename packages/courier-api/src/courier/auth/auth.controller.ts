import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { CourierLoginDto } from '../model';
import { CourierAuthService } from './courier_auth.service';

@Controller('auth')
export class CourierAuth {
  constructor(private readonly courierAuthService: CourierAuthService) {}
  @Post('login')
  async login(@Body() body: CourierLoginDto) {
    const courier = await this.courierAuthService.getWithEmailAndPassword(
      body.email,
      body.password,
    );
    if (!courier) {
      throw new UnauthorizedException();
    }
    const token = await this.courierAuthService.getAuthToken(courier._id);
    const refreshToken = await this.courierAuthService.getRefreshToken(
      courier._id,
    );
    return {
      token,
      refreshToken,
    };
  }
}
