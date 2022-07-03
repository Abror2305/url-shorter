import { IsDateString, IsNumber, IsOptional, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class UpdateDto {
  @ApiProperty({ description: 'Maximum clicks for url', required: false })
  @IsOptional()
  @IsNumber()
  @Min(2)
  maxClicks: number;
  @ApiProperty({
    description: 'Expiration date for url',
    example: '2022-07-03T19:49:42.123Z',
    required: false,
  })
  @IsOptional()
  @IsDateString({})
  expiresIn: Date;
}
