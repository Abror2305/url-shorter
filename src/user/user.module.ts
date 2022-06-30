import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
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
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
