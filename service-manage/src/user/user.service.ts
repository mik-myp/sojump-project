import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';
import { Model } from 'mongoose';
import { UserDto } from './dto/user.dto';
import { generateToken } from 'utils/jwt';
import md5 from 'utils/md5';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async register(userDto: UserDto) {
    try {
      const user = await this.userModel.create(userDto);
      const userData = user.toJSON();
      delete userData.password;
      return { code: 0, data: userData, message: '注册成功' };
    } catch (error: unknown) {
      if (
        typeof error === 'object' &&
        error !== null &&
        (error as { code?: number }).code === 11000
      ) {
        return { code: 400, message: '用户名已存在', data: null };
      }
      throw error;
    }
  }

  async login(userDto: UserDto) {
    const user = await this.userModel
      .findOne({
        username: userDto.username,
      })
      .select('+password');

    if (!user) {
      return { code: 1, message: '用户名或密码错误' };
    }

    const isMatch = user.password === md5(userDto.password);
    if (!isMatch) {
      return { code: 1, message: '用户名或密码错误' };
    }

    const userData = user.toJSON();
    delete userData.password;

    const token = await generateToken(userData);
    return { code: 0, data: { user: userData, token } };
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
}
