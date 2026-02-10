import { ApiProperty } from '@nestjs/swagger';

export class RoleResponseDto {
  @ApiProperty({
    description: 'Unique identifier of the role',
    example: '123e4567-e89b-12d3-a456-426614174000',
    type: String,
  })
  id: string;

  @ApiProperty({
    description: 'Name of the role',
    example: 'admin',
    type: String,
  })
  name: string;

  @ApiProperty({
    description: 'Description of the role',
    example: 'Administrator role',
    type: String,
    required: false,
  })
  description: string | null;

  @ApiProperty({
    description: 'Creation timestamp',
    example: '2026-02-10T19:42:44.000Z',
    type: Date,
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Last update timestamp',
    example: '2026-02-10T19:42:44.000Z',
    type: Date,
  })
  updatedAt: Date;
}
