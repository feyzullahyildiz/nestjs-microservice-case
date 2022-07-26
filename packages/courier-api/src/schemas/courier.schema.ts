import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
export type CourierDocument = Courier & Document;

@Schema()
export class Courier {
  @Prop({ type: mongoose.Schema.Types.String, required: true })
  email: string;

  @Prop({ type: mongoose.Schema.Types.String, required: true })
  password: string;

  @Prop({ type: mongoose.Schema.Types.Boolean, default: true, required: true })
  active: boolean;
}

export const CourierSchema = SchemaFactory.createForClass(Courier);
