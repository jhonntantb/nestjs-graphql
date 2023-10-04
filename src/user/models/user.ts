import { ObjectType, Field, Int } from '@nestjs/graphql';
import { ObjectId } from 'mongoose';

@ObjectType()
export class User {
  _id?: ObjectId;

  @Field()
  userId: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  password?: string;

  @Field(() => Int)
  age: number;

  @Field({ nullable: true })
  isSubscribe?: boolean;
}
