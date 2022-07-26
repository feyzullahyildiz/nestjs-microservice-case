import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { JwtCourierAuthGuard } from '../auth/jwt.guard';
import { UpdateLocation } from '../model';
import type { RabbitLocationData } from 'shared-data';

@UseGuards(JwtCourierAuthGuard)
@Controller('me')
export class CourierMeController {
  constructor(
    @Inject('COURIER_LOCATION_RABBITMQ')
    private readonly locationSender: ClientProxy,
  ) {}
  @Get()
  getHello(@Req() req) {
    return { message: `hello courier` };
  }
  @Post('location')
  async updateLocation(@Req() req, @Body() body: UpdateLocation) {
    // We will send a rabbitmq message with user id
    const { date, lat, lon } = body;
    const payload: RabbitLocationData = {
      courierId: req.user.userId,
      date,
      lat,
      lon,
    };
    await firstValueFrom(this.locationSender.emit('v1', payload));
    return {};
  }
}
