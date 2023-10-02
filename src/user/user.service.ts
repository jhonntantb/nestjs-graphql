import { Injectable } from '@nestjs/common';
import { User } from './schemas/user.schema';
import { CreateUserInput } from './dto/input/create-user.input';
import { GetUserArgs } from './dto/args/get-user.args';
// import { GetUsersArgs } from './dto/args/get-users.args';
import { DeleteUserInput } from './dto/input/delete-user.input';
import { UpdateUserInput } from './dto/input/update-user.input';
import { v4 as uuidv4 } from 'uuid';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  private users: User[] = [
    {
      email: 'jhon@gmail.com',
      password: 'password123',
      userId: '123msnddh',
      age: 30,
    },
  ];

  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}
  public async createUser(createUserData: CreateUserInput): Promise<User> {
    const user: User = {
      userId: uuidv4(),
      ...createUserData,
    };
    const newUser = await this.userModel.create(user);
    return newUser;
  }
  public updateUser(updateUserData: UpdateUserInput): User {
    const user = this.users.find(
      (user) => user.userId === updateUserData.userId,
    );
    Object.assign(user, updateUserData);
    return user;
  }
  public async getUser(getUserArgs: GetUserArgs): Promise<User> {
    const user = await this.userModel.findById(getUserArgs.userId);
    return user;
  }

  public async getUserByEmail(email: string): Promise<User | undefined> {
    const user = await this.userModel.findOne({ email: email });
    return user;
  }
  public async getUsers(): Promise<User[]> {
    const users = await this.userModel.find();
    return users;
  }
  public async deleteUser(deleteUserData: DeleteUserInput): Promise<unknown> {
    const user = await this.userModel.deleteOne({ id: deleteUserData.userId });
    return user;
  }
}
