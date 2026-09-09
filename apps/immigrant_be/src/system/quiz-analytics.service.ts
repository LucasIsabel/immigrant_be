import { Injectable } from '@nestjs/common';
import { QuizSubmissionsRepository } from './quiz-submissions.repository';
import {
  QuizAnalyticsPeriod,
  QuizAnalyticsQueryDto,
} from './dto/quiz-analytics-query.dto';
import {
  QuizAnalyticsResponseDto,
  QuizAnswerBucketDto,
  QuizCountryBucketDto,
  QuizStepBreakdownDto,
} from './dto/quiz-analytics-response.dto';
import {
  ListQuizSubmissionsQueryDto,
  UNKNOWN_COUNTRY_FILTER,
} from './dto/list-quiz-submissions-query.dto';
import {
  PaginatedQuizSubmissionsResponseDto,
  QuizSubmissionAnswerDto,
} from './dto/quiz-submission-response.dto';
import { StepType } from './dto/types.dto';

const DAYS_IN_PERIOD: Record<Exclude<QuizAnalyticsPeriod, 'all'>, number> = {
  [QuizAnalyticsPeriod.d7]: 7,
  [QuizAnalyticsPeriod.d30]: 30,
  [QuizAnalyticsPeriod.d90]: 90,
};

/** The order the quiz asks them in, so the page reads like the form. */
const STEP_ORDER: StepType[] = [
  StepType.TARGET,
  StepType.ENGLISH,
  StepType.BUDGET,
  StepType.EDUCATION,
  StepType.PROFESSIONAL,
  StepType.CLIMATE,
  StepType.FAMILY,
  StepType.COUNTRY,
  StepType.NATIONALITY,
];

/**
 * The step arrives from SQL as a plain string, so it is looked up rather than
 * compared: a value the quiz no longer sends simply finds nothing.
 */
const STEP_BY_VALUE = new Map<string, StepType>(
  STEP_ORDER.map((step) => [step as string, step]),
);

/** What `suggestions.parameters` holds, once it survives the type guard. */
interface StoredStep {
  type: string;
  answer: string;
}

function isStoredStep(value: unknown): value is StoredStep {
  if (typeof value !== 'object' || value === null) return false;
  const step = value as Record<string, unknown>;
  return typeof step.type === 'string' && typeof step.answer === 'string';
}

/** The JSON column is `unknown` as far as the compiler knows, and it is right. */
function readSteps(parameters: unknown): StoredStep[] {
  if (typeof parameters !== 'object' || parameters === null) return [];
  const steps = (parameters as Record<string, unknown>).steps;
  return Array.isArray(steps) ? steps.filter(isStoredStep) : [];
}

@Injectable()
export class QuizAnalyticsService {
  constructor(private readonly repository: QuizSubmissionsRepository) {}

  /** `all` has no start; everything else counts back from now. */
  private periodStart(period: QuizAnalyticsPeriod, now: Date): Date | null {
    if (period === QuizAnalyticsPeriod.all) return null;
    const days = DAYS_IN_PERIOD[period];
    return new Date(now.getTime() - days * 24 * 60 * 60 * 1000);
  }

  async getAnalytics(
    query: QuizAnalyticsQueryDto,
  ): Promise<QuizAnalyticsResponseDto> {
    const period = query.period ?? QuizAnalyticsPeriod.all;
    const to = new Date();
    const from = this.periodStart(period, to);

    const [
      totals,
      uniqueProfiles,
      plansFromQuiz,
      countries,
      languages,
      answers,
      days,
    ] = await Promise.all([
      this.repository.countTotals(from),
      this.repository.countDistinctProfiles(from),
      this.repository.countPlansFromQuiz(from),
      this.repository.groupByCountry(from),
      this.repository.groupByLanguage(from),
      this.repository.countAnswers(from),
      this.repository.countByDay(from),
    ]);

    return {
      period,
      from,
      to,
      totals: { ...totals, uniqueProfiles, plansFromQuiz },
      byCountry: this.toCountryBuckets(countries),
      byLanguage: languages
        .map((row) => ({ language: row.language, count: row._count._all }))
        .sort((a, b) => b.count - a.count),
      bySteps: this.toStepBreakdowns(
        answers,
        totals.submissions - totals.withoutAnswers,
      ),
      byDay: days,
    };
  }

  /**
   * Unknown goes last however big it is — and today it is the biggest, because
   * the migration backfilled the pre-existing profiles with no country. A
   * chart that opens on "unknown" says nothing about where people are.
   */
  private toCountryBuckets(
    rows: { originCountry: string | null; _count: { _all: number } }[],
  ): QuizCountryBucketDto[] {
    return rows
      .map((row) => ({ country: row.originCountry, count: row._count._all }))
      .sort((a, b) => {
        if (a.country === null) return 1;
        if (b.country === null) return -1;
        return b.count - a.count;
      });
  }

  private toStepBreakdowns(
    rows: { step: string; answer: string; count: number }[],
    answered: number,
  ): QuizStepBreakdownDto[] {
    const byStep = new Map<StepType, Map<string, number>>();

    for (const row of rows) {
      const step = STEP_BY_VALUE.get(row.step);
      if (!step) continue;

      const bucket = byStep.get(step) ?? new Map<string, number>();
      // A single COUNTRY answer can name several countries; each one counts.
      for (const answer of this.splitAnswer(step, row.answer)) {
        bucket.set(answer, (bucket.get(answer) ?? 0) + row.count);
      }
      byStep.set(step, bucket);
    }

    return STEP_ORDER.filter((step) => byStep.has(step)).map((step) => ({
      step,
      answers: this.toAnswerBuckets(byStep.get(step) ?? new Map(), answered),
    }));
  }

  /**
   * The country question stores what the person picked as one comma-joined
   * string. Splitting it in SQL would have been clever and untestable without
   * a database; here it is three lines and a unit test.
   */
  private splitAnswer(step: StepType, answer: string): string[] {
    if (step !== StepType.COUNTRY) return [answer];
    return answer
      .split(',')
      .map((part) => part.trim())
      .filter((part) => part.length > 0);
  }

  private toAnswerBuckets(
    counts: Map<string, number>,
    answered: number,
  ): QuizAnswerBucketDto[] {
    return [...counts.entries()]
      .map(([answer, count]) => ({
        answer,
        count,
        // Against the submissions that carry answers, never against the ones
        // whose suggestion failed: those cannot have answered anything.
        share: answered > 0 ? count / answered : 0,
      }))
      .sort((a, b) => b.count - a.count);
  }

  async listSubmissions(
    query: ListQuizSubmissionsQueryDto,
  ): Promise<PaginatedQuizSubmissionsResponseDto> {
    const page = query.page ?? 1;
    const limit = query.limit ?? 20;

    const [rows, total] = await this.repository.list(
      {
        ...(query.country
          ? {
              originCountry:
                query.country === UNKNOWN_COUNTRY_FILTER ? null : query.country,
            }
          : {}),
        ...(query.language ? { language: query.language } : {}),
      },
      (page - 1) * limit,
      limit,
    );

    return {
      data: rows.map((row) => ({
        id: row.id,
        createdAt: row.createdAt,
        originCountry: row.originCountry,
        language: row.language,
        suggestionId: row.suggestionId,
        answers: readSteps(row.suggestion?.parameters).map(
          (step): QuizSubmissionAnswerDto => ({
            type: step.type as StepType,
            answer: step.answer,
          }),
        ),
      })),
      total,
      page,
      limit,
    };
  }
}
