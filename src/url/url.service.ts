import {
  Injectable,
  NotFoundException,
  NotAcceptableException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Urls } from 'src/entities/url.entity';
import { GenerateDto, UpdateDto } from './DTOs';
import { Url } from './interfaces';

@Injectable()
export class UrlService {
  constructor(@InjectModel(Urls.name) private readonly urlModel: Model<Urls>) {}
  async generateUrl(dto: GenerateDto, id: ObjectId) {
    if (new Date().getTime() >= new Date(dto.expiresIn).getTime()) {
      throw new NotAcceptableException(
        'expiresIn must be greater than current time!',
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
    if (data.maxClicks && data.maxClicks <= data.clicks) {
      throw new BadRequestException('The maximum number of clicks is over');
    }

    if (
      data.expiresIn &&
      new Date().getTime() > new Date(data.expiresIn).getTime()
    ) {
      throw new BadRequestException('Time is over');
    }
    data.clicks++;
    data.save();
    return { url: data.url, statusCode: 301 };
  }
  async deleteUrl(userId: ObjectId, linkId: string) {
    const url = await this.urlModel.findOneAndDelete({ userId, _id: linkId });

    if (!url) {
      throw new NotFoundException('link id is invalid');
    }
    return url;
  }
  async update(userId: ObjectId, linkId: string, dto: UpdateDto) {
    if (new Date().getTime() >= new Date(dto.expiresIn).getTime()) {
      throw new NotAcceptableException(
        'expiresIn must be greater than current time!',
      );
    }
    const data = await this.urlModel.findOneAndUpdate(
      { userId, _id: linkId },
      { $set: dto },
    );
    return data;
  }
}
