import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { basename, join } from 'path';
import { toFile } from 'qrcode';
import { Urls } from './entities/url.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(Urls.name) private readonly urlModel: Model<Urls>,
    private readonly config: ConfigService,
  ) {}
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
  async qrcode(userId: ObjectId, linkId: string) {
    const data = await this.urlModel.findOne({ _id: linkId, userId });

    if (!data) {
      throw new NotFoundException('Link id is invalid');
    }
    if (data.qrCodePath) {
      return join(__dirname, '../qrcodes', data.qrCodePath);
    }
    const qrPath = join(__dirname, '../qrcodes', linkId + '.png');
    const url = new URL(linkId, this.config.get('HOST')) + '';
    await toFile(qrPath, url);
    data.qrCodePath = basename(qrPath);
    data.save();
    return qrPath;
  }
}
