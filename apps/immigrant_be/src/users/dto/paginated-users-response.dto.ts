import { ApiProperty } from '@nestjs/swagger';
import { AdminUserResponseDto } from './admin-user-response.dto';

export class PaginatedUsersResponseDto {
  @ApiProperty({
    description: 'List of users',
    type: [AdminUserResponseDto],
  })
  data: AdminUserResponseDto[];

  @ApiProperty({
    description: 'Total number of users matching the filters',
    example: 150,
  })
  total: number;

  @ApiProperty({
    description: 'Current page number',
    example: 1,
  })
  page: number;

  @ApiProperty({
    description: 'Number of users per page',
    example: 20,
  })
  limit: number;

  @ApiProperty({
    description: 'Total number of pages',
    example: 8,
  })
  totalPages: number;
}
