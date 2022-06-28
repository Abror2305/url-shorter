import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import * as shortid from 'shortid';

@Schema({ timestamps: { createdAt: true, updatedAt: true } })
export class Urls extends Document {
  @Prop({ type: Types.ObjectId, default: shortid.generate })
  _id: Types.ObjectId;
  @Prop({ default: 0 })
  clicks: number;
  @Prop()
  maxClicks: number;
  @Prop({ required: true })
  redirectUrl: string;
  @Prop()
  qrCodePath: string;
  @Prop({ type: Date })
  expiresIn: Date;
  @Prop({ type: Types.ObjectId, ref: 'Users' })
  userId: Types.ObjectId;
}

export const UrlSchema = SchemaFactory.createForClass(Urls);
