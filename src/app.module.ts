import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { UrlModule } from './url/url.module';

@Module({
  imports: [AuthModule, UrlModule],
  controllers: [AppController, AuthController],
  providers: [AppService],
})
export class AppModule {}
