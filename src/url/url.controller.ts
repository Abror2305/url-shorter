import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { GenerateDto, UpdateDto } from './DTOs';
import { UrlService } from './url.service';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Url')
@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller('url')
export class UrlController {
  constructor(private readonly urlService: UrlService) {}
  @Get(':id')
  info(@GetUser('_id') userId: ObjectId, @Param('id') linkId: string) {
    return this.urlService.info(userId, linkId);
  }

  @Post('generate')
  generateUrl(@Body() dto: GenerateDto, @GetUser('_id') id: ObjectId) {
    return this.urlService.generateUrl(dto, id);
  }

  @Patch(':id')
  update(
    @GetUser('_id') id: ObjectId,
    @Param('id') linkId: string,
    @Body() dto: UpdateDto,
  ) {
    return this.urlService.update(id, linkId, dto);
  }

  @Delete(':id')
  deleteUrl(@GetUser('_id') id: ObjectId, @Param('id') linkId: string) {
    return this.urlService.deleteUrl(id, linkId);
  }
}
