import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateRoleDto {
  @ApiProperty({
    description: 'New name for the role',
    example: 'editor',
    type: String,
    required: false,
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    description: 'New description for the role',
    example: 'Can edit content but not manage users',
    type: String,
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;
}
