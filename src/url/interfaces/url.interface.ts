import { ObjectId } from 'mongoose';
import { GenerateDto } from '../DTOs/generate.dto';

export interface Url extends GenerateDto {
  userId: ObjectId;
}
