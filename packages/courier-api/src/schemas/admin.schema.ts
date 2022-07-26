import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
export type AdminUserDocument = AdminUser & Document;

@Schema()
export class AdminUser {
  @Prop({ type: mongoose.Schema.Types.String, required: true })
  email: string;

  @Prop({ type: mongoose.Schema.Types.String, required: true })
  password: string;

  @Prop({ type: mongoose.Schema.Types.Boolean, default: true, required: true })
  active: boolean;
}

export const AdminUserSchema = SchemaFactory.createForClass(AdminUser);
