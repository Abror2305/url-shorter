import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto, SignUpDto } from './DTOs';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('signin')
  signin(@Body() dto: SignInDto) {
    return this.authService.createUser(dto);
  }
  @Post('signup')
  @HttpCode(HttpStatus.OK)
  signup(@Body() dto: SignUpDto) {
    return this.authService.signUp(dto);
  }
}
