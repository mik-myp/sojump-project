import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';
import { Model } from 'mongoose';
import { UserDto } from './dto/user.dto';
import { generateToken } from 'utils/jwt';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  register(userDto: UserDto) {
    const res = this.userModel.create(userDto);

    return { code: 0, data: res };
  }

  async login(userDto: UserDto) {
    const user = await this.userModel.findOne({
      username: userDto.username,
      password: userDto.password,
    });
    if (user) {
      const token = await generateToken(user.toJSON());
      return { code: 0, data: { user, token } };
    }
    return { code: 1, message: '用户名或密码错误' };
  }

  async getUserInfo(id?: string) {
    if (!id) {
      return { code: 401, message: '该用户不存在', data: null };
    }

    const user = await this.userModel.findOne({ _id: id });
    if (!user) {
      return { code: 401, message: '该用户不存在', data: null };
    }

    return { code: 0, data: user };
  }

  // findAll() {
  //   return `This action returns all user`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} user`;
  // }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
