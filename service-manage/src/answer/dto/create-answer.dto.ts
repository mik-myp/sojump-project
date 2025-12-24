import { ApiProperty } from '@nestjs/swagger';

export class CreateAnswerDto {
  @ApiProperty({ description: '问卷答案内容', type: Object })
  answers: Record<string, unknown>;
}
