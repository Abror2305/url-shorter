import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Redirect,
  UseGuards,
} from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { GenerateDto } from './DTOs';
import { UrlService } from './url.service';

@Controller('url')
export class UrlController {
  constructor(private readonly urlService: UrlService) {}
  @UseGuards(JwtGuard)
  @Post('generate')
  generateUrl(@Body() dto: GenerateDto, @GetUser('_id') id: ObjectId) {
    return this.urlService.generateUrl(dto, id);
  }

  @Get(':id')
  @Redirect()
  redirectUrl(@Param('id') id: string) {
    return this.urlService.redirect(id);
  }
}
