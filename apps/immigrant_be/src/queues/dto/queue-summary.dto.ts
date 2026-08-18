import { ApiProperty } from '@nestjs/swagger';

export class QueueCountsDto {
  @ApiProperty({ example: 2, description: 'Jobs waiting to be processed' })
  waiting: number;

  @ApiProperty({ example: 1, description: 'Jobs currently being processed' })
  active: number;

  @ApiProperty({ example: 0, description: 'Jobs delayed for later' })
  delayed: number;

  @ApiProperty({ example: 3, description: 'Jobs that exhausted their retries' })
  failed: number;

  @ApiProperty({
    example: 148,
    description: 'Recently completed jobs still retained',
  })
  completed: number;
}

export class QueueSummaryDto {
  @ApiProperty({ example: 'ai_blog_image_queue' })
  name: string;

  @ApiProperty({
    example: false,
    description:
      'True when the queue is paused and workers will not pick new jobs',
  })
  paused: boolean;

  @ApiProperty({ type: QueueCountsDto })
  counts: QueueCountsDto;
}
