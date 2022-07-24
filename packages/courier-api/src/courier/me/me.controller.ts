import { Controller, Get } from '@nestjs/common';

@Controller('me')
export class CourierMeController {
  @Get()
  getHello(): string {
    return 'hello courier';
  }
}
