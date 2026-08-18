import { ApiProperty } from '@nestjs/swagger';
import { QueueJobState } from './list-queue-jobs-query.dto';

export class QueueJobDto {
  @ApiProperty({ example: '4812' })
  id: string;

  @ApiProperty({ example: 'generate_ai_blog_image' })
  name: string;

  @ApiProperty({ enum: QueueJobState, example: QueueJobState.FAILED })
  state: string;

  @ApiProperty({ example: 3, description: 'Attempts already made' })
  attemptsMade: number;

  @ApiProperty({
    example: 3,
    description: 'Configured maximum attempts for this job',
  })
  attemptsMax: number;

  @ApiProperty({
    example: 'Every model failed for "blog_image"',
    nullable: true,
  })
  failedReason: string | null;

  @ApiProperty({
    example: 'Vistos de nômade digital no Japão',
    nullable: true,
    description:
      'Short label derived from sanitized job data (topic, title, folder, locale, post id)',
  })
  target: string | null;

  @ApiProperty({
    example: 1755538123456,
    description: 'When the job was created (ms)',
  })
  timestamp: number;

  @ApiProperty({
    example: 1755538128000,
    nullable: true,
    description: 'When a worker started the job (ms)',
  })
  processedOn: number | null;

  @ApiProperty({
    example: 1755538132000,
    nullable: true,
    description: 'When the job finished (ms)',
  })
  finishedOn: number | null;

  @ApiProperty({
    description:
      'Sanitized job payload: short primitives only. Prompts, markdown and other large fields are dropped.',
    type: 'object',
    additionalProperties: true,
    example: { postId: 'post-1', title: 'Vistos de nômade digital no Japão' },
  })
  data: Record<string, string | number | boolean>;
}

export class PaginatedQueueJobsDto {
  @ApiProperty({ type: [QueueJobDto] })
  data: QueueJobDto[];

  @ApiProperty({ example: 8 })
  total: number;

  @ApiProperty({ example: 1 })
  page: number;

  @ApiProperty({ example: 20 })
  limit: number;

  @ApiProperty({ example: 1 })
  totalPages: number;
}
