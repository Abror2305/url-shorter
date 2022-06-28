import {
  Injectable,
  NotFoundException,
  NotAcceptableException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Urls } from 'src/entities/url.entity';
import { GenerateDto } from './DTOs';
import { Url } from './interfaces';

@Injectable()
export class UrlService {
  constructor(@InjectModel(Urls.name) private readonly urlModel: Model<Urls>) {}
  async generateUrl(dto: GenerateDto, id: ObjectId) {
    if (new Date().getTime() >= new Date(dto.expiresIn).getTime()) {
      throw new NotAcceptableException(
        'expiresIn must be less than current time!',
      );
    }
    const data: Url = Object.assign(dto, { userId: id });
    const url = await this.urlModel.create(data);
    return url;
  }
  async redirect(id: string) {
    const data: Urls = await this.urlModel.findById(id);
    if (!data) {
      throw new NotFoundException('This url not found');
    }
    if (data.maxClicks && data.maxClicks < data.clicks) {
      return new BadRequestException('Maximum clicks ');
    }
    data.clicks++;
    data.save();
    return { url: data.url, statusCode: 301 };
  }
}
