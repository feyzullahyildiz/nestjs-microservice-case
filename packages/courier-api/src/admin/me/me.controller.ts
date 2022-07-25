import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAdminAuthGuard } from '../auth/jwt.guard';

@UseGuards(JwtAdminAuthGuard)
@Controller('me')
export class MeController {
  @Get()
  getHello() {
    return { message: 'hello admin' };
  }
}
