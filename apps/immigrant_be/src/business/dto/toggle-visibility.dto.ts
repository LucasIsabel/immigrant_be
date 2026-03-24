import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';

export class ToggleVisibilityDto {
  @ApiProperty({ example: true })
  @IsBoolean()
  isPublic: boolean;
}
