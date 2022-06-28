import { Module } from '@nestjs/common';
import { UrlService } from './url.service';
import { UrlController } from './url.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Urls, UrlSchema } from 'src/entities/url.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Urls.name,
        schema: UrlSchema,
      },
    ]),
  ],
  controllers: [UrlController],
  providers: [UrlService],
})
export class UrlModule {}
