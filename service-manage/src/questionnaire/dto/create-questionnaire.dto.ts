import { ApiPropertyOptional } from '@nestjs/swagger';

export class CreateQuestionnaireDto {
  @ApiPropertyOptional({ description: '问卷标题' })
  title?: string;

  @ApiPropertyOptional({ description: '问题列表', type: [Object], default: [] })
  componentList?: Array<Record<string, unknown>>;

  @ApiPropertyOptional({ description: '问卷是否已发布', default: false })
  isPublished?: boolean;

  @ApiPropertyOptional({ description: '问卷是否有星号', default: false })
  isStar?: boolean;

  @ApiPropertyOptional({ description: '问卷是否已软删除', default: false })
  isDeleted?: boolean;

  @ApiPropertyOptional({ description: '总答案计数', default: 0 })
  answerCount?: number;
  @ApiPropertyOptional({ description: '页面设置', default: { px: 8, py: 0 } })
  pageSetting?: {
    px: number;
    py: number;
  };
}
