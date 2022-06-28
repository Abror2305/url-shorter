import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsUrl,
  Min,
} from 'class-validator';

export class GenerateDto {
  @IsNotEmpty()
  @IsUrl()
  url: string;
  @IsOptional()
  @IsNumber()
  @Min(2)
  maxClicks: number;
  @IsOptional()
  @IsDateString({})
  expiresIn: Date;
}
