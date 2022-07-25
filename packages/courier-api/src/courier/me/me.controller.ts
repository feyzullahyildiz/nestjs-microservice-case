import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { JwtCourierAuthGuard } from '../auth/jwt.guard';
import { UpdateLocation } from '../model';

@UseGuards(JwtCourierAuthGuard)
@Controller('me')
export class CourierMeController {
  @Get()
  getHello(@Req() req) {
    return { message: `hello courier` };
  }
  @Post('location')
  updateLocation(@Body() body: UpdateLocation) {
    // We will send a rabbitmq message with user id
    return true;
  }
}
