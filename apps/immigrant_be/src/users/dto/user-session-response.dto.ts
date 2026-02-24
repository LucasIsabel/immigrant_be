import { ApiProperty } from '@nestjs/swagger';

export class UserSessionResponseDto {
  @ApiProperty({
    description: 'Session ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @ApiProperty({
    description: 'Session expiration date',
    example: '2026-03-10T19:42:44.000Z',
  })
  expiresAt: Date;

  @ApiProperty({
    description: 'IP address of the session',
    example: '192.168.1.1',
    required: false,
    nullable: true,
  })
  ipAddress: string | null;

  @ApiProperty({
    description: 'User agent string',
    example: 'Mozilla/5.0 ...',
    required: false,
    nullable: true,
  })
  userAgent: string | null;

  @ApiProperty({
    description: 'Session creation timestamp',
    example: '2026-02-10T19:42:44.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Roles encoded in the session',
    example: '[]',
  })
  roles: string;
}
