import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { QuestionnaireService } from './questionnaire.service';
import { CreateQuestionnaireDto } from './dto/create-questionnaire.dto';
import { UpdateQuestionnaireDto } from './dto/update-questionnaire.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/guards/jwt-auth.guard';
import type { Request } from 'express';

type AuthedRequest = Request & { user?: { _id?: string } };

@ApiTags('问卷')
@UseGuards(JwtAuthGuard)
@Controller('question')
export class QuestionnaireController {
  constructor(private readonly questionnaireService: QuestionnaireService) {}

  @Post()
  @ApiOperation({ summary: '创建问卷' })
  create(@Req() req: AuthedRequest) {
    return this.questionnaireService.create(req.user?._id ?? '');
  }

  @Get()
  @ApiOperation({ summary: '获取全部问卷' })
  findAll(
    @Req() req: AuthedRequest,
    @Query('page') page?: string,
    @Query('pageSize') pageSize?: string,
    @Query('isDeleted') isDeleted?: boolean,
    @Query('isStar') isStar?: boolean,
  ) {
    return this.questionnaireService.findAll(req.user?._id ?? '', {
      page: page ? Number(page) : undefined,
      pageSize: pageSize ? Number(pageSize) : undefined,
      isDeleted,
      isStar,
    });
  }

  @Get(':id')
  @ApiOperation({ summary: '获取问卷详情' })
  findOne(@Req() req: AuthedRequest, @Param('id') id: string) {
    return this.questionnaireService.findOne(id, req.user?._id ?? '');
  }

  @Patch(':id')
  @ApiOperation({ summary: '修改问卷' })
  update(
    @Req() req: AuthedRequest,
    @Param('id') id: string,
    @Body() updateQuestionnaireDto: UpdateQuestionnaireDto,
  ) {
    return this.questionnaireService.update(id, updateQuestionnaireDto, req.user?._id ?? '');
  }
  @Patch()
  @ApiOperation({ summary: '恢复问卷' })
  restore(@Req() req: AuthedRequest, @Body('ids') ids: string[]) {
    return this.questionnaireService.restore(ids, req.user?._id ?? '');
  }

  @Delete()
  @ApiOperation({ summary: '删除问卷' })
  remove(@Req() req: AuthedRequest, @Body('ids') ids: string[]) {
    return this.questionnaireService.remove(ids, req.user?._id ?? '');
  }

  @Post('duplicate/:id')
  @ApiOperation({ summary: '复制问卷' })
  duplicate(@Req() req: AuthedRequest, @Param('id') id: string) {
    return this.questionnaireService.duplicate(id, req.user?._id ?? '');
  }
}
