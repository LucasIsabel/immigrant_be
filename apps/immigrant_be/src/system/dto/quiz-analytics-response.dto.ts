import { ApiProperty } from '@nestjs/swagger';
import { StepType } from './types.dto';
import { QuizAnalyticsPeriod } from './quiz-analytics-query.dto';

export class QuizAnalyticsTotalsDto {
  @ApiProperty({ description: 'Rows in quiz_submissions within the period.' })
  submissions: number;

  @ApiProperty({
    description:
      'Distinct profiles behind those submissions. Lower than `submissions` ' +
      'whenever two people answered identically, because `suggestions` reuses ' +
      'a row for identical answers.',
  })
  uniqueProfiles: number;

  @ApiProperty({
    description:
      'Submissions whose request carried a usable country header. The rest ' +
      'reached the origin without Cloudflare, or came from the backfill.',
  })
  withKnownCountry: number;

  @ApiProperty({
    description:
      'Submissions with no profile attached, so no recoverable answers: the ' +
      'suggestion failed and recording is best-effort.',
  })
  withoutAnswers: number;

  @ApiProperty({ description: 'Plans created from a quiz suggestion.' })
  plansFromQuiz: number;
}

export class QuizCountryBucketDto {
  @ApiProperty({
    type: String,
    nullable: true,
    example: 'PT',
    description: 'ISO 3166-1 alpha-2, or null when the country is unknown.',
  })
  country: string | null;

  @ApiProperty()
  count: number;
}

export class QuizLanguageBucketDto {
  @ApiProperty({ example: 'pt' })
  language: string;

  @ApiProperty()
  count: number;
}

export class QuizAnswerBucketDto {
  @ApiProperty({
    example: 'work',
    description: 'The value as the quiz stored it, not a label.',
  })
  answer: string;

  @ApiProperty()
  count: number;

  @ApiProperty({
    example: 0.42,
    description: 'Share of the submissions that carry answers at all, 0..1.',
  })
  share: number;
}

export class QuizStepBreakdownDto {
  @ApiProperty({ enum: StepType })
  step: StepType;

  @ApiProperty({ type: [QuizAnswerBucketDto] })
  answers: QuizAnswerBucketDto[];
}

export class QuizDayBucketDto {
  @ApiProperty({ example: '2026-09-09', description: 'UTC date.' })
  day: string;

  @ApiProperty()
  count: number;
}

export class QuizAnalyticsResponseDto {
  @ApiProperty({ enum: QuizAnalyticsPeriod })
  period: QuizAnalyticsPeriod;

  @ApiProperty({
    type: Date,
    nullable: true,
    description: 'Start of the window, or null when the period is `all`.',
  })
  from: Date | null;

  @ApiProperty()
  to: Date;

  @ApiProperty({ type: QuizAnalyticsTotalsDto })
  totals: QuizAnalyticsTotalsDto;

  @ApiProperty({
    type: [QuizCountryBucketDto],
    description: 'Busiest first, with the unknown bucket always last.',
  })
  byCountry: QuizCountryBucketDto[];

  @ApiProperty({ type: [QuizLanguageBucketDto] })
  byLanguage: QuizLanguageBucketDto[];

  @ApiProperty({ type: [QuizStepBreakdownDto] })
  bySteps: QuizStepBreakdownDto[];

  @ApiProperty({ type: [QuizDayBucketDto] })
  byDay: QuizDayBucketDto[];
}
