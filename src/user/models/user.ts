import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field()
  userId: string;

  @Field()
  email: string;

  @Field(() => Int)
  age: number;

  @Field({ nullable: true })
  isSubscribe?: boolean;
}