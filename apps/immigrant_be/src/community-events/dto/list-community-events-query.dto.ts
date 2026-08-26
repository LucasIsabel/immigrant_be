import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, Max, Min } from 'class-validator';
import { CommunityEventStatus } from '../../../../../generated/prisma';

/** Shared by the admin queue and by the organizer's own list. */
export class ListCommunityEventsQueryDto {
  @ApiPropertyOptional({ enum: CommunityEventStatus })
  @IsOptional()
  @IsEnum(CommunityEventStatus)
  status?: CommunityEventStatus;

  @ApiPropertyOptional({ default: 1, minimum: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({ default: 20, minimum: 1, maximum: 100 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number = 20;
}
