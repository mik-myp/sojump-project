import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({ description: '用户名' })
  username: string;

  @ApiPropertyOptional({ description: '密码' })
  password?: string;
}
