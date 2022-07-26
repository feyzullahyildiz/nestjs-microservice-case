import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AdminService } from '../admin/admin.service';
import { LoginDto, RefreshTokenDto } from '../model';
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
      throw new UnauthorizedException();
    }
    const token = await this.authService.getAuthToken(user.id);
    const refreshToken = await this.authService.getRefreshToken(user.id);
    await this.adminService.updateUserRefreshToken(user.id, refreshToken);
    return { token, refreshToken };
  }
  // We will need only refreshToken here, no need to check auth
  @Post('refresh')
  async getRefreshToken(@Body() body: RefreshTokenDto) {
    const user = await this.adminService.getUserByRefreshToken(
      body.refreshToken,
    );
    if (!user) {
      throw new UnauthorizedException();
    }
    const token = await this.authService.getAuthToken(user.id);
    return { token };
  }
}
