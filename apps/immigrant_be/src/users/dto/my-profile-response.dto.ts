import { ApiProperty } from '@nestjs/swagger';
import { AdminUserRoleDto } from './admin-user-response.dto';

export class MyProfileResponseDto {
  @ApiProperty({
    description: 'User ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @ApiProperty({ description: 'User name', example: 'John Doe' })
  name: string;

  @ApiProperty({ description: 'User email', example: 'john@example.com' })
  email: string;

  @ApiProperty({ description: 'Whether the email is verified', example: true })
  emailVerified: boolean;

  @ApiProperty({
    description: 'User avatar URL',
    example: 'https://example.com/avatar.png',
    required: false,
    nullable: true,
    type: 'string',
  })
  image: string | null;

  @ApiProperty({
    description: 'User bio',
    example: 'Software engineer based in Brazil.',
    nullable: true,
    type: 'string',
  })
  bio: string | null;

  @ApiProperty({
    description: 'Whether email notifications are enabled',
    example: true,
  })
  emailNotificationsEnabled: boolean;

  @ApiProperty({ description: 'Whether the account is active', example: true })
  isActive: boolean;

  @ApiProperty({ description: 'Whether the user is banned', example: false })
  banned: boolean;

  @ApiProperty({
    description: 'Account creation timestamp',
    example: '2026-02-10T19:42:44.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'User roles',
    type: [AdminUserRoleDto],
    required: false,
  })
  userRoles?: AdminUserRoleDto[];
}
