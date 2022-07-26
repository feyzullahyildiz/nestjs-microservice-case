import { Body, Controller, Post, Put } from '@nestjs/common';
import { CourierService } from '../../courier/courier.service';
import { ChangeCourierActive, CreateCourier } from '../model';

@Controller('courier')
export class CourierController {
  constructor(private readonly courierService: CourierService) {}
  @Post()
  async addCourier(@Body() body: CreateCourier) {
    const user = await this.courierService.createCourier(
      body.email,
      body.password,
    );
    return { _id: user._id, email: user.email };
  }
  @Put('state')
  async changeCourierActive(@Body() body: ChangeCourierActive) {
    await this.courierService.changeActive(body.id, body.active);
    return {};
  }
}
