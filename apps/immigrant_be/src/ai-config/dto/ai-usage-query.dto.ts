import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';

export enum AiUsagePeriod {
  day = 'day',
  week = 'week',
  month = 'month',
}

export class AiUsageQueryDto {
  @ApiProperty({
    enum: AiUsagePeriod,
    default: AiUsagePeriod.week,
    required: false,
  })
  @IsEnum(AiUsagePeriod)
  @IsOptional()
  period?: AiUsagePeriod;
}
