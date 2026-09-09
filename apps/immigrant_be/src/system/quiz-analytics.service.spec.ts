// The service names its repository for injection, and that class reaches
// `@app/database`, whose barrel drags better-auth in. Same convention as
// `community-events.service.spec.ts`: the repository is a mock here anyway.
jest.mock('@app/database', () => ({
  PrismaService: jest.fn(),
  DatabaseModule: jest.fn(),
}));

import { QuizAnalyticsService } from './quiz-analytics.service';
import { QuizAnalyticsPeriod } from './dto/quiz-analytics-query.dto';
import { StepType } from './dto/types.dto';

type Repo = {
  countTotals: jest.Mock;
  countDistinctProfiles: jest.Mock;
  countPlansFromQuiz: jest.Mock;
  groupByCountry: jest.Mock;
  groupByLanguage: jest.Mock;
  countAnswers: jest.Mock;
  countByDay: jest.Mock;
  list: jest.Mock;
};

const makeRepo = (overrides: Partial<Repo> = {}): Repo => ({
  countTotals: jest.fn().mockResolvedValue({
    submissions: 10,
    withKnownCountry: 6,
    withoutAnswers: 2,
  }),
  countDistinctProfiles: jest.fn().mockResolvedValue(7),
  countPlansFromQuiz: jest.fn().mockResolvedValue(3),
  groupByCountry: jest.fn().mockResolvedValue([]),
  groupByLanguage: jest.fn().mockResolvedValue([]),
  countAnswers: jest.fn().mockResolvedValue([]),
  countByDay: jest.fn().mockResolvedValue([]),
  list: jest.fn().mockResolvedValue([[], 0]),
  ...overrides,
});

const makeService = (repo: Repo) =>
  new QuizAnalyticsService(repo as unknown as never);

describe('QuizAnalyticsService', () => {
  describe('the window it asks for', () => {
    it('asks for everything when the period is `all`', async () => {
      const repo = makeRepo();
      const result = await makeService(repo).getAnalytics({
        period: QuizAnalyticsPeriod.all,
      });

      expect(result.from).toBeNull();
      for (const method of [
        repo.countTotals,
        repo.countDistinctProfiles,
        repo.groupByCountry,
        repo.countAnswers,
      ]) {
        expect(method).toHaveBeenCalledWith(null);
      }
    });

    it('counts back from now for a bounded period', async () => {
      const repo = makeRepo();
      const before = Date.now();

      const result = await makeService(repo).getAnalytics({
        period: QuizAnalyticsPeriod.d30,
      });

      const thirtyDays = 30 * 24 * 60 * 60 * 1000;
      expect(result.from).not.toBeNull();
      const from = (result.from as Date).getTime();
      expect(from).toBeGreaterThanOrEqual(before - thirtyDays - 1000);
      expect(from).toBeLessThanOrEqual(Date.now() - thirtyDays + 1000);
      expect(repo.countTotals).toHaveBeenCalledWith(result.from);
    });

    it('defaults to everything when no period is given', async () => {
      const repo = makeRepo();
      const result = await makeService(repo).getAnalytics({});

      expect(result.period).toBe(QuizAnalyticsPeriod.all);
      expect(result.from).toBeNull();
    });
  });

  describe('countries', () => {
    it('puts the unknown bucket last even when it is the biggest', async () => {
      // This is today's data: the migration backfilled every pre-existing
      // profile with no country, so unknown outnumbers everything real.
      const repo = makeRepo({
        groupByCountry: jest.fn().mockResolvedValue([
          { originCountry: null, _count: { _all: 25 } },
          { originCountry: 'PT', _count: { _all: 4 } },
          { originCountry: 'BR', _count: { _all: 9 } },
        ]),
      });

      const { byCountry } = await makeService(repo).getAnalytics({});

      expect(byCountry).toEqual([
        { country: 'BR', count: 9 },
        { country: 'PT', count: 4 },
        { country: null, count: 25 },
      ]);
    });
  });

  describe('answers', () => {
    it('counts each country of a multi-country answer', async () => {
      const repo = makeRepo({
        countAnswers: jest.fn().mockResolvedValue([
          { step: 'COUNTRY', answer: 'Canada, Portugal', count: 2 },
          { step: 'COUNTRY', answer: 'Portugal', count: 1 },
        ]),
      });

      const { bySteps } = await makeService(repo).getAnalytics({});
      const countries = bySteps.find((s) => s.step === StepType.COUNTRY);

      expect(countries?.answers).toEqual([
        { answer: 'Portugal', count: 3, share: 3 / 8 },
        { answer: 'Canada', count: 2, share: 2 / 8 },
      ]);
    });

    it('measures the share against the submissions that have answers', async () => {
      // 10 submissions, 2 of them with no profile: 8 could have answered.
      const repo = makeRepo({
        countAnswers: jest
          .fn()
          .mockResolvedValue([{ step: 'TARGET', answer: 'work', count: 4 }]),
      });

      const { bySteps } = await makeService(repo).getAnalytics({});

      expect(bySteps[0].answers[0].share).toBe(0.5);
    });

    it('keeps the questions in the order the quiz asks them', async () => {
      const repo = makeRepo({
        countAnswers: jest.fn().mockResolvedValue([
          { step: 'FAMILY', answer: 'alone', count: 1 },
          { step: 'TARGET', answer: 'work', count: 1 },
          { step: 'ENGLISH', answer: 'fluent', count: 1 },
        ]),
      });

      const { bySteps } = await makeService(repo).getAnalytics({});

      expect(bySteps.map((s) => s.step)).toEqual([
        StepType.TARGET,
        StepType.ENGLISH,
        StepType.FAMILY,
      ]);
    });

    it('ignores a step type it does not know', async () => {
      // An older quiz version, or a value written by hand.
      const repo = makeRepo({
        countAnswers: jest
          .fn()
          .mockResolvedValue([{ step: 'ASTROLOGY', answer: 'leo', count: 3 }]),
      });

      const { bySteps } = await makeService(repo).getAnalytics({});

      expect(bySteps).toEqual([]);
    });

    it('does not divide by zero when nothing has answers', async () => {
      const repo = makeRepo({
        countTotals: jest.fn().mockResolvedValue({
          submissions: 2,
          withKnownCountry: 0,
          withoutAnswers: 2,
        }),
        countAnswers: jest
          .fn()
          .mockResolvedValue([{ step: 'TARGET', answer: 'work', count: 1 }]),
      });

      const { bySteps } = await makeService(repo).getAnalytics({});

      expect(bySteps[0].answers[0].share).toBe(0);
    });
  });

  describe('the raw list', () => {
    it('turns a page number into an offset', async () => {
      const repo = makeRepo();
      await makeService(repo).listSubmissions({ page: 3, limit: 20 });

      expect(repo.list).toHaveBeenCalledWith({}, 40, 20);
    });

    it('reads `unknown` as "no country at all"', async () => {
      const repo = makeRepo();
      await makeService(repo).listSubmissions({ country: 'unknown' });

      expect(repo.list).toHaveBeenCalledWith({ originCountry: null }, 0, 20);
    });

    it('passes a real country through as itself', async () => {
      const repo = makeRepo();
      await makeService(repo).listSubmissions({
        country: 'PT',
        language: 'pt',
      });

      expect(repo.list).toHaveBeenCalledWith(
        { originCountry: 'PT', language: 'pt' },
        0,
        20,
      );
    });

    it('reads the answers off the joined profile', async () => {
      const repo = makeRepo({
        list: jest.fn().mockResolvedValue([
          [
            {
              id: 'a',
              createdAt: new Date('2026-09-09T10:00:00Z'),
              originCountry: 'PT',
              language: 'pt',
              suggestionId: 's1',
              suggestion: {
                parameters: {
                  steps: [{ type: 'TARGET', answer: 'work' }],
                },
              },
            },
          ],
          1,
        ]),
      });

      const { data } = await makeService(repo).listSubmissions({});

      expect(data[0].answers).toEqual([{ type: 'TARGET', answer: 'work' }]);
    });

    it('says a submission with no profile has no answers', async () => {
      // Recording is best-effort: the suggestion failed, the row survived.
      const repo = makeRepo({
        list: jest.fn().mockResolvedValue([
          [
            {
              id: 'a',
              createdAt: new Date(),
              originCountry: null,
              language: 'en',
              suggestionId: null,
              suggestion: null,
            },
          ],
          1,
        ]),
      });

      const { data } = await makeService(repo).listSubmissions({});

      expect(data[0].answers).toEqual([]);
    });

    it('drops a malformed step instead of returning `undefined` fields', async () => {
      const repo = makeRepo({
        list: jest.fn().mockResolvedValue([
          [
            {
              id: 'a',
              createdAt: new Date(),
              originCountry: null,
              language: 'en',
              suggestionId: 's1',
              suggestion: {
                parameters: {
                  steps: [
                    { type: 'TARGET', answer: 'work' },
                    { type: 'ENGLISH' },
                    'nonsense',
                    null,
                  ],
                },
              },
            },
          ],
          1,
        ]),
      });

      const { data } = await makeService(repo).listSubmissions({});

      expect(data[0].answers).toEqual([{ type: 'TARGET', answer: 'work' }]);
    });

    it('survives a profile whose parameters are not what we expect', async () => {
      const repo = makeRepo({
        list: jest.fn().mockResolvedValue([
          [
            {
              id: 'a',
              createdAt: new Date(),
              originCountry: null,
              language: 'en',
              suggestionId: 's1',
              suggestion: { parameters: 'not an object' },
            },
          ],
          1,
        ]),
      });

      const { data } = await makeService(repo).listSubmissions({});

      expect(data[0].answers).toEqual([]);
    });
  });

  it('reports the totals it was given', async () => {
    const { totals } = await makeService(makeRepo()).getAnalytics({});

    expect(totals).toEqual({
      submissions: 10,
      withKnownCountry: 6,
      withoutAnswers: 2,
      uniqueProfiles: 7,
      plansFromQuiz: 3,
    });
  });
});
