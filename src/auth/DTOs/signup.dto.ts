import { IsNotEmpty, IsString, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class SignUpDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Matches(/^(?=.{4,20}$)(?:[a-zA-Z\d]+(?:(?:\.|-|_)[a-zA-Z\d])*)+$/, {
    message: () => 'username is invalid',
  })
  username: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, {
    message: 'invalid password',
  })
  password: string;
}
