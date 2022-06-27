import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: { createdAt: true, updatedAt: true } })
export class Urls extends Document {}

export const UrlSchema = SchemaFactory.createForClass(Urls);
