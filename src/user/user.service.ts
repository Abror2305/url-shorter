import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Urls } from 'src/entities/url.entity';

@Injectable()
export class UserService {
  constructor(@InjectModel(Urls.name) private readonly urlModel: Model<Urls>) {}
  async getLinks(id: ObjectId) {
    const links = await this.urlModel.find({ userId: id });
    return links;
  }
}
