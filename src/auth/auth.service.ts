import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SignInDto, SignUpDto } from './DTOs';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Users } from 'src/entities';
@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Users.name) private readonly userModel: Model<Users>,
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
  ) {}
  async createUser(dto: SignInDto) {
    try {
      dto.password = await argon.hash(dto.password);

      const user = await this.userModel.create(dto);

      return this.signToken(user._id, user.username);
    } catch (e) {
      if (e.code === 11000) {
        const errorName = e.keyValue.username ?? e.keyValue.email;
        throw new ForbiddenException(`${errorName} is already taken`);
      }
    }
  }

  async signUp(dto: SignUpDto) {
    const user = await this.userModel.findOne({
      username: dto.username,
    });
    if (!user) {
      throw new ForbiddenException('Credentials invalid');
    }

    const pwMatches = await argon.verify(user.password, dto.password);

    if (!pwMatches) {
      throw new ForbiddenException('Credentials invalid');
    }
    return this.signToken(user._id, user.username);
  }

  async signToken(
    userId: string,
    username: string,
  ): Promise<{
    access_token: string;
  }> {
    const payload = {
      sub: userId,
      username,
    };
    const secret = this.config.get('JWT_SECRET');
    const token = await this.jwt.signAsync(payload, {
      expiresIn: '5h',
      secret,
    });
    return {
      access_token: token,
    };
  }
}
