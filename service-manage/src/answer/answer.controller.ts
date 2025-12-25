import { Body, Controller, Get, Param, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AnswerService } from './answer.service';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { JwtAuthGuard } from '@/guards/jwt-auth.guard';
import type { Request } from 'express';

type AuthedRequest = Request & { user?: { _id?: string } };

@ApiTags('问卷答卷')
@Controller('answer')
export class AnswerController {
  constructor(private readonly answerService: AnswerService) {}

  @Post(':id')
  @ApiOperation({ summary: '提交答卷（无需登录）' })
  create(@Param('id') id: string, @Body() createAnswerDto: CreateAnswerDto) {
    return this.answerService.create(id, createAnswerDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({ summary: '获取答卷列表（需登录）' })
  findAll(@Req() req: AuthedRequest, @Query('id') id: string) {
    return this.answerService.findAll(id, req.user?._id ?? '');
  }
}
