import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { User } from './models/user';
import { UserService } from './user.service';
import { CreateUserInput } from './dto/input/create-user.input';
import { UpdateUserInput } from './dto/input/update-user.input';
import { DeleteUserInput } from './dto/input/delete-user.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guards/gfl-auth.guard';
import { CurrentUser } from './decorators/current-user.decorator';
import { ObjectId } from 'mongoose';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => User, { name: 'user', nullable: true })
  @UseGuards(GqlAuthGuard)
  async getUser(@CurrentUser() _id: ObjectId): Promise<User> {
    return this.userService.getUser(_id);
  }

  @Query(() => [User], { name: 'users', nullable: 'items' })
  async getUsers(): Promise<User[]> {
    return this.userService.getUsers();
  }

  @Mutation(() => User)
  async createUser(
    @Args('createUserData') createUserData: CreateUserInput,
  ): Promise<User> {
    return this.userService.createUser(createUserData);
  }

  @Mutation(() => User)
  @UseGuards(GqlAuthGuard)
  async updateUSer(
    @CurrentUser() _id: ObjectId,
    @Args('updateUserData') updateUserData: UpdateUserInput,
  ): Promise<User> {
    const userUpdate = await this.userService.updateUser(updateUserData, _id);
    return userUpdate;
  }

  @Mutation(() => User)
  async deleteUser(
    @Args('deleteUserData') deleteUserData: DeleteUserInput,
  ): Promise<unknown> {
    return this.userService.deleteUser(deleteUserData);
  }
}
