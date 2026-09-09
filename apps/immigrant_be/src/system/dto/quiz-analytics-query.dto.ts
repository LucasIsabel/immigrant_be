import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';

/** Windows worth asking for. `all` is the default because the table is young. */
export enum QuizAnalyticsPeriod {
  d7 = '7d',
  d30 = '30d',
  d90 = '90d',
  all = 'all',
}

export class QuizAnalyticsQueryDto {
  @ApiPropertyOptional({
    enum: QuizAnalyticsPeriod,
    default: QuizAnalyticsPeriod.all,
  })
  @IsOptional()
  @IsEnum(QuizAnalyticsPeriod)
  period?: QuizAnalyticsPeriod = QuizAnalyticsPeriod.all;
}
