import { Injectable } from '@nestjs/common';
import { User } from './models/user';
import { CreateUserInput } from './dto/input/create-user.input';
import { DeleteUserInput } from './dto/input/delete-user.input';
import { UpdateUserInput } from './dto/input/update-user.input';
import { v4 as uuidv4 } from 'uuid';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';

@Injectable()
export class UserService {
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
  public async updateUser(updateUserData: UpdateUserInput, _id: ObjectId) {
    const user = await this.userModel.findByIdAndUpdate(_id, updateUserData);
    return user;
  }
  public async getUser(_id: ObjectId): Promise<User> {
    const user = await this.userModel.findById(_id);
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
