import { Injectable } from '@nestjs/common';
import { PrismaService } from '@app/database';
import { Prisma } from 'generated/prisma';

/** A `(step, raw answer)` pair with how many submissions carry it. */
export interface AnswerCountRow {
  step: string;
  answer: string;
  count: number;
}

export interface DayCountRow {
  day: string;
  count: number;
}

export interface QuizSubmissionsFilter {
  originCountry?: string | null;
  language?: string;
}

/**
 * Reading `quiz_submissions`, which is all this class does.
 *
 * Separate from `SystemRepository` on purpose: that one carries Gemini,
 * embeddings and vector SQL, and every spec that touches it has to mock the
 * lot. Analytics is a handful of counts, and it should be testable as one.
 */
@Injectable()
export class QuizSubmissionsRepository {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * `null` means "since the beginning" everywhere in this class — the caller
   * decides the window, the queries only honour it.
   */
  private since(from: Date | null): Prisma.Sql {
    return from ? Prisma.sql`WHERE qs.created_at >= ${from}` : Prisma.empty;
  }

  private whereFrom(from: Date | null): Prisma.QuizSubmissionWhereInput {
    return from ? { createdAt: { gte: from } } : {};
  }

  async countTotals(from: Date | null) {
    const where = this.whereFrom(from);

    const [submissions, withKnownCountry, withoutAnswers] =
      await this.prisma.$transaction([
        this.prisma.quizSubmission.count({ where }),
        this.prisma.quizSubmission.count({
          where: { ...where, originCountry: { not: null } },
        }),
        this.prisma.quizSubmission.count({
          where: { ...where, suggestionId: null },
        }),
      ]);

    return { submissions, withKnownCountry, withoutAnswers };
  }

  /**
   * Distinct profiles, not distinct people: two people who answered the same
   * nine questions share one `suggestions` row, by design of the write path.
   */
  async countDistinctProfiles(from: Date | null): Promise<number> {
    const rows = await this.prisma.$queryRaw<{ count: number }[]>`
      SELECT COUNT(DISTINCT qs.suggestion_id)::int AS count
      FROM quiz_submissions qs
      ${this.since(from)}
    `;
    return rows[0]?.count ?? 0;
  }

  countPlansFromQuiz(from: Date | null): Promise<number> {
    return this.prisma.plans.count({
      where: {
        suggestion_id: { not: null },
        ...(from ? { created_at: { gte: from } } : {}),
      },
    });
  }

  groupByCountry(from: Date | null) {
    return this.prisma.quizSubmission.groupBy({
      by: ['originCountry'],
      where: this.whereFrom(from),
      _count: { _all: true },
    });
  }

  groupByLanguage(from: Date | null) {
    return this.prisma.quizSubmission.groupBy({
      by: ['language'],
      where: this.whereFrom(from),
      _count: { _all: true },
    });
  }

  /**
   * The answers live in `suggestions.parameters`, so counting them means
   * unrolling a JSON array — `groupBy` cannot reach inside one.
   *
   * `COUNT(*)::int` is not decoration: without the cast Postgres returns
   * `bigint`, Prisma hands back a `BigInt`, and `JSON.stringify` throws on it.
   */
  countAnswers(from: Date | null): Promise<AnswerCountRow[]> {
    return this.prisma.$queryRaw<AnswerCountRow[]>`
      SELECT step->>'type'   AS step,
             step->>'answer' AS answer,
             COUNT(*)::int   AS count
      FROM quiz_submissions qs
      JOIN suggestions s ON s.id = qs.suggestion_id
      CROSS JOIN LATERAL jsonb_array_elements(s.parameters->'steps') AS step
      ${this.since(from)}
      GROUP BY 1, 2
      ORDER BY 1, 3 DESC
    `;
  }

  countByDay(from: Date | null): Promise<DayCountRow[]> {
    return this.prisma.$queryRaw<DayCountRow[]>`
      SELECT to_char(date_trunc('day', qs.created_at AT TIME ZONE 'UTC'), 'YYYY-MM-DD') AS day,
             COUNT(*)::int AS count
      FROM quiz_submissions qs
      ${this.since(from)}
      GROUP BY 1
      ORDER BY 1
    `;
  }

  /** The raw list, newest first, with whatever answers each row can reach. */
  list(filter: QuizSubmissionsFilter, skip: number, take: number) {
    const where: Prisma.QuizSubmissionWhereInput = {
      ...(filter.originCountry !== undefined
        ? { originCountry: filter.originCountry }
        : {}),
      ...(filter.language ? { language: filter.language } : {}),
    };

    return this.prisma.$transaction([
      this.prisma.quizSubmission.findMany({
        where,
        skip,
        take,
        orderBy: { createdAt: 'desc' },
        include: { suggestion: { select: { parameters: true } } },
      }),
      this.prisma.quizSubmission.count({ where }),
    ]);
  }
}
