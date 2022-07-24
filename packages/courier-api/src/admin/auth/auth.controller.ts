import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { AdminService } from '../admin/admin.service';
import { LoginDto } from '../me/dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly adminService: AdminService,
    private readonly authService: AuthService,
  ) {}

  @Post('login')
  async login(@Body() body: LoginDto) {
    const user = await this.adminService.getWithEmailAndPassword(
      body.email,
      body.password,
    );
    if (!user) {
      // TODO throw custom error.
      throw new Error('UnAuthorized');
    }
    const token = this.authService.getAuthToken(user.id);
    const refreshToken = this.authService.getRefreshToken(user.id);
    return { token, refreshToken };
  }
  // CHECK AUTH HERE
  @Get('refresh')
  async getRefreshToken(@Req() req: Request) {
    const id = 'user_id';
    const token = this.authService.getAuthToken(id);
    return { token };
  }
}
