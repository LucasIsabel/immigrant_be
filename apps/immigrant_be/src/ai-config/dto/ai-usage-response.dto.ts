import { ApiProperty } from '@nestjs/swagger';
import { AiUsagePeriod } from './ai-usage-query.dto';

export class AiUsageByScenarioDto {
  @ApiProperty()
  scenario: string;

  @ApiProperty()
  calls: number;

  @ApiProperty({ type: Number, nullable: true })
  costUsd: number | null;

  @ApiProperty()
  failures: number;
}

export class AiUsageByModelDto {
  @ApiProperty()
  model: string;

  @ApiProperty()
  calls: number;

  @ApiProperty({ type: Number, nullable: true })
  costUsd: number | null;

  @ApiProperty()
  failures: number;
}

export class AiUsageByErrorKindDto {
  @ApiProperty({ nullable: true })
  errorKind: string | null;

  @ApiProperty()
  count: number;
}

export class AiUsageTotalsDto {
  @ApiProperty()
  calls: number;

  @ApiProperty({ type: Number, nullable: true })
  costUsd: number | null;

  @ApiProperty()
  failures: number;
}

export class AiUsageResponseDto {
  @ApiProperty({ enum: AiUsagePeriod })
  period: AiUsagePeriod;

  @ApiProperty()
  from: Date;

  @ApiProperty()
  to: Date;

  @ApiProperty({ type: AiUsageTotalsDto })
  totals: AiUsageTotalsDto;

  @ApiProperty({ type: [AiUsageByScenarioDto] })
  byScenario: AiUsageByScenarioDto[];

  @ApiProperty({ type: [AiUsageByModelDto] })
  byModel: AiUsageByModelDto[];

  @ApiProperty({ type: [AiUsageByErrorKindDto] })
  byErrorKind: AiUsageByErrorKindDto[];
}
