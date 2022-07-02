import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Redirect,
  UseGuards,
} from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { GenerateDto, UpdateDto } from './DTOs';
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

  @UseGuards(JwtGuard)
  @Delete(':id')
  deleteUrl(@GetUser('_id') id: ObjectId, @Param('id') linkId: string) {
    return this.urlService.deleteUrl(id, linkId);
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  update(
    @GetUser('_id') id: ObjectId,
    @Param('id') linkId: string,
    @Body() dto: UpdateDto,
  ) {
    return this.urlService.update(id, linkId, dto);
  }
}
