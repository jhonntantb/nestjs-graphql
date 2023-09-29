import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { User } from './models/user';
import { UserService } from './user.service';
import { GetUserArgs } from './dto/args/get-user.args';
import { GetUsersArgs } from './dto/args/get-users.args';
import { CreateUserInput } from './dto/input/create-user.input';
import { UpdateUserInput } from './dto/input/update-user.input';
import { DeleteUserInput } from './dto/input/delete-user.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guards/gfl-auth.guard';
import { CurrentUser } from './decorators/current-user.decorator';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => User, { name: 'user', nullable: true })
  @UseGuards(GqlAuthGuard)
  getUser(@CurrentUser() user: User, @Args() getUserArgs: GetUserArgs): User {
    console.log(user);
    console.log(getUserArgs);
    return this.userService.getUser({ userId: user.userId });
  }

  @Query(() => [User], { name: 'users', nullable: 'items' })
  getUsers(@Args() getUsersArgs: GetUsersArgs): User[] {
    return this.userService.getUsers(getUsersArgs);
  }

  @Mutation(() => User)
  createUser(@Args('createUserData') createUserData: CreateUserInput): User {
    return this.userService.createUser(createUserData);
  }

  @Mutation(() => User)
  updateUSer(@Args('updateUserData') updateUserData: UpdateUserInput): User {
    return this.userService.updateUser(updateUserData);
  }

  @Mutation(() => User)
  deleteUser(@Args('deleteUserData') deleteUserData: DeleteUserInput): User {
    return this.userService.deleteUser(deleteUserData);
  }
}
