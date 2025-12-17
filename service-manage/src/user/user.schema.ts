import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import md5 from 'utils/md5';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true, select: false, set: md5 })
  password?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
