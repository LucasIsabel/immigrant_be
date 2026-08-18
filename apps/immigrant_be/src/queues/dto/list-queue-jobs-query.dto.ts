import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, Max, Min } from 'class-validator';

export enum QueueJobState {
  WAITING = 'waiting',
  ACTIVE = 'active',
  DELAYED = 'delayed',
  FAILED = 'failed',
  COMPLETED = 'completed',
}

export class ListQueueJobsQueryDto {
  @ApiPropertyOptional({
    enum: QueueJobState,
    description:
      'Filter by BullMQ state. Omit to list the live set (waiting, active, delayed, failed).',
  })
  @IsEnum(QueueJobState)
  @IsOptional()
  state?: QueueJobState;

  @ApiPropertyOptional({
    description: 'Page number (1-based)',
    example: 1,
    default: 1,
  })
  @IsInt()
  @Min(1)
  @Type(() => Number)
  @IsOptional()
  page?: number = 1;

  @ApiPropertyOptional({
    description: 'Jobs per page',
    example: 20,
    default: 20,
  })
  @IsInt()
  @Min(1)
  @Max(100)
  @Type(() => Number)
  @IsOptional()
  limit?: number = 20;
}
