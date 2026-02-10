import { ApiProperty } from '@nestjs/swagger';
import { RoleResponseDto } from './role-response.dto';

export class UserRoleResponseDto {
  @ApiProperty({
    description: 'Unique identifier of the user-role assignment',
    example: '123e4567-e89b-12d3-a456-426614174000',
    type: String,
  })
  id: string;

  @ApiProperty({
    description: 'UUID of the assigned user',
    example: '123e4567-e89b-12d3-a456-426614174000',
    type: String,
  })
  userId: string;

  @ApiProperty({
    description: 'UUID of the assigned role',
    example: '987fcdeb-51a2-12d3-a456-426614174000',
    type: String,
  })
  roleId: string;

  @ApiProperty({
    description: 'Timestamp when the role was assigned',
    example: '2026-02-10T19:42:44.000Z',
    type: Date,
  })
  assignedAt: Date;

  @ApiProperty({
    description: 'Role details',
    type: RoleResponseDto,
  })
  role: RoleResponseDto;
}
