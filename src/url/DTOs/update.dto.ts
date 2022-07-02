import { IsDateString, IsNumber, IsOptional, Min } from 'class-validator';

export class UpdateDto {
  @IsOptional()
  @IsNumber()
  @Min(2)
  maxClicks: number;
  @IsOptional()
  @IsDateString({})
  expiresIn: Date;
}
