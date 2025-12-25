import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { QuestionnaireService } from './questionnaire.service';

@ApiTags('问卷')
@Controller('questionNoAuth')
export class QuestionnairePublicController {
  constructor(private readonly questionnaireService: QuestionnaireService) {}

  @Get(':id')
  @ApiOperation({ summary: '获取问卷详情（无需登录）' })
  findOne(@Param('id') id: string) {
    return this.questionnaireService.findOneNoAuth(id);
  }
}
