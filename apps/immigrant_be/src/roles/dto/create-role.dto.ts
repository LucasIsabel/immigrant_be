import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateRoleDto {
  @ApiProperty({
    description: 'Unique name of the role',
    example: 'editor',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Optional description of the role',
    example: 'Can edit content but not manage users',
    type: String,
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;
}
