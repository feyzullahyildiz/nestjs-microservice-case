import { Controller, Get } from '@nestjs/common';

@Controller('me')
export class MeController {
  @Get()
  getHello(): string {
    return 'hello admin';
  }
}
