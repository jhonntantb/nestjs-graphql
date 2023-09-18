import { Injectable } from '@nestjs/common';
import { User } from './models/user';
import { CreateUserInput } from './dto/input/create-user.input';
import { GetUserArgs } from './dto/args/get-user.args';
import { GetUsersArgs } from './dto/args/get-users.args';
import { DeleteUserInput } from './dto/input/delete-user.input';
import { UpdateUserInput } from './dto/input/update-user.input';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserService {
  private users: User[] = [];
  public createUser(createUserData: CreateUserInput): User {
    const user: User = {
      userId: uuidv4(),
      ...createUserData,
    };
    this.users.push(user);
    return user;
  }
  public updateUser(updateUserData: UpdateUserInput): User {
    const user = this.users.find(
      (user) => user.userId === updateUserData.userId,
    );
    Object.assign(user, updateUserData);
    return user;
  }
  public getUser(getUserArgs: GetUserArgs): User {
    const user = this.users.find((user) => user.userId === getUserArgs.userId);

    return user;
  }
  public getUsers(getUsersArgs: GetUsersArgs): User[] {
    const users = getUsersArgs.userIds.map((userId) =>
      this.getUser({ userId }),
    );
    return users;
  }
  public deleteUser(deleteUserData: DeleteUserInput): User {
    const userIndex = this.users.findIndex(
      (user) => user.userId === deleteUserData.userId,
    );
    const user = this.users[userIndex];
    this.users.splice(userIndex);

    return user;
  }
}
