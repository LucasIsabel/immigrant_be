import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

export enum UserSortBy {
  NAME = 'name',
  EMAIL = 'email',
  CREATED_AT = 'createdAt',
  UPDATED_AT = 'updatedAt',
}

export enum SortDirection {
  ASC = 'asc',
  DESC = 'desc',
}

export class ListUsersQueryDto {
  @ApiProperty({
    description: 'Page number (1-based)',
    example: 1,
    required: false,
    default: 1,
  })
  @IsInt()
  @Min(1)
  @Type(() => Number)
  @IsOptional()
  page?: number = 1;

  @ApiProperty({
    description: 'Number of users per page',
    example: 20,
    required: false,
    default: 20,
  })
  @IsInt()
  @Min(1)
  @Max(100)
  @Type(() => Number)
  @IsOptional()
  limit?: number = 20;

  @ApiProperty({
    description: 'Search by name or email',
    example: 'john',
    required: false,
  })
  @IsString()
  @IsOptional()
  search?: string;

  @ApiProperty({
    description: 'Filter by active status',
    example: true,
    required: false,
  })
  @IsBoolean()
  @Type(() => Boolean)
  @IsOptional()
  isActive?: boolean;

  @ApiProperty({
    description: 'Filter by banned status',
    example: false,
    required: false,
  })
  @IsBoolean()
  @Type(() => Boolean)
  @IsOptional()
  banned?: boolean;

  @ApiProperty({
    description: 'Field to sort by',
    enum: UserSortBy,
    required: false,
    default: UserSortBy.CREATED_AT,
  })
  @IsEnum(UserSortBy)
  @IsOptional()
  sortBy?: UserSortBy = UserSortBy.CREATED_AT;

  @ApiProperty({
    description: 'Sort direction',
    enum: SortDirection,
    required: false,
    default: SortDirection.DESC,
  })
  @IsEnum(SortDirection)
  @IsOptional()
  sortDirection?: SortDirection = SortDirection.DESC;
}
