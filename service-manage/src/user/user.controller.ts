import { Controller, Get, Post, Body, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/guards/jwt-auth.guard';
import type { Request } from 'express';

@ApiTags('用户模块') // 分组
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @ApiOperation({ summary: '注册' })
  @ApiResponse({ status: 201, description: '注册成功' })
  register(@Body() userDto: UserDto) {
    return this.userService.register(userDto);
  }

  @Post('login')
  @ApiOperation({ summary: '登录' })
  @ApiResponse({ status: 201, description: '登录成功' })
  login(@Body() userDto: UserDto) {
    return this.userService.login(userDto);
  }

  @Get('info')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '获取用户信息' })
  getUserInfo(@Req() req: Request) {
    const user = (req as { user?: { _id?: string } }).user;
    return this.userService.getUserInfo(user?._id);
  }
}
