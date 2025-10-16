import { Controller, Req } from '@nestjs/common';
import { Get } from '@nestjs/common';

@Controller('users')
export class UserController {
  @Get('/')
  getMe() {
    return 'Hello World';
  }
}
