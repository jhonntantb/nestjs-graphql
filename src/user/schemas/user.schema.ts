import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  userId: string;

  @Prop()
  email: string;

  @Prop()
  password?: string;

  @Prop()
  age: number;

  @Prop()
  isSubscribe?: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
