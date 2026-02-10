import { ApiProperty } from '@nestjs/swagger';
import { RoleResponseDto } from '../../roles/dto/role-response.dto';

export class AdminUserRoleDto {
  @ApiProperty({
    description: 'User-role assignment ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @ApiProperty({
    description: 'Date when the role was assigned',
    example: '2026-02-10T19:42:44.000Z',
  })
  assignedAt: Date;

  @ApiProperty({
    description: 'Role details',
    type: RoleResponseDto,
  })
  role: RoleResponseDto;
}

export class AdminUserResponseDto {
  @ApiProperty({
    description: 'User ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @ApiProperty({
    description: 'User name',
    example: 'John Doe',
  })
  name: string;

  @ApiProperty({
    description: 'User email',
    example: 'john@example.com',
  })
  email: string;

  @ApiProperty({
    description: 'Whether the email is verified',
    example: true,
  })
  emailVerified: boolean;

  @ApiProperty({
    description: 'User avatar URL',
    example: 'https://example.com/avatar.png',
    required: false,
  })
  image: string | null;

  @ApiProperty({
    description: 'Whether the user account is active',
    example: true,
  })
  isActive: boolean;

  @ApiProperty({
    description: 'Whether the user is banned',
    example: false,
  })
  banned: boolean;

  @ApiProperty({
    description: 'Reason for the ban',
    example: 'Violation of terms of service',
    required: false,
  })
  banReason: string | null;

  @ApiProperty({
    description: 'When the ban expires',
    example: '2026-03-10T19:42:44.000Z',
    required: false,
  })
  banExpires: Date | null;

  @ApiProperty({
    description: 'Account creation timestamp',
    example: '2026-02-10T19:42:44.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Last update timestamp',
    example: '2026-02-10T19:42:44.000Z',
  })
  updatedAt: Date;

  @ApiProperty({
    description: 'User roles',
    type: [AdminUserRoleDto],
    required: false,
  })
  userRoles?: AdminUserRoleDto[];
}
