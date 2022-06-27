import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { PassportStrategy } from '@nestjs/passport';
import { Model } from 'mongoose';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Users } from '../entities/auth.entity';

@Injectable()
export class JwtStategy extends PassportStrategy(Strategy) {
  constructor(
    config: ConfigService,
    @InjectModel(Users.name) private readonly userModel: Model<Users>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('JWT_SECRET'),
    });
  }
  async validate(payload: { sub: string; email: string }) {
    const user = await this.userModel.findById(payload.sub, {
      password: 0,
      __v: 0,
    });
    return user;
  }
}
