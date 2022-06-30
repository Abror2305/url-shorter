import { Controller, Get, UseGuards } from '@nestjs/common';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { UserService } from './user.service';

@UseGuards(JwtGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get('me')
  getMe(@GetUser() user) {
    return user;
  }
  @Get('links')
  getLinks(@GetUser('_id') id) {
    return this.userService.getLinks(id);
  }
}
