import {
  Controller,
  Get,
  Param,
  Redirect,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { ObjectId } from 'mongoose';
import { AppService } from './app.service';
import { GetUser } from './auth/decorator';
import { JwtGuard } from './auth/guard';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
@ApiTags('Main')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(':id')
  @Redirect()
  redirectUrl(@Param('id') id: string) {
    return this.appService.redirect(id);
  }
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Get('/qr/:id')
  async qrcode(
    @Res() res: Response,
    @Param('id') linkId: string,
    @GetUser('_id') id: ObjectId,
  ) {
    return res.sendFile(await this.appService.qrcode(id, linkId));
  }
}
