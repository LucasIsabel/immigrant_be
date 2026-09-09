jest.mock('@app/database', () => ({
  PrismaService: jest.fn(),
  DatabaseModule: jest.fn(),
}));

import { QuizSubmissionsRepository } from './quiz-submissions.repository';

describe('QuizSubmissionsRepository', () => {
  const makePrisma = () => ({
    quizSubmission: {
      count: jest.fn().mockReturnValue('count-query'),
      findMany: jest.fn().mockReturnValue('find-query'),
      groupBy: jest.fn(),
    },
    plans: { count: jest.fn() },
    $transaction: jest.fn().mockResolvedValue([[], 0]),
    $queryRaw: jest.fn().mockResolvedValue([]),
  });

  const makeRepository = (prisma: ReturnType<typeof makePrisma>) =>
    new QuizSubmissionsRepository(prisma as unknown as never);

  it('pages the list and counts it in one transaction', async () => {
    const prisma = makePrisma();

    await makeRepository(prisma).list({ originCountry: 'PT' }, 40, 20);

    expect(prisma.$transaction).toHaveBeenCalledWith([
      'find-query',
      'count-query',
    ]);
    // The count has to answer for the same rows the page came from, or the
    // pager sends the reader to a page that does not exist.
    const findWhere = prisma.quizSubmission.findMany.mock.calls[0][0].where;
    const countWhere = prisma.quizSubmission.count.mock.calls[0][0].where;
    expect(findWhere).toEqual({ originCountry: 'PT' });
    expect(countWhere).toEqual(findWhere);
  });

  it('asks for the newest submissions first, with their profile', async () => {
    const prisma = makePrisma();

    await makeRepository(prisma).list({}, 0, 20);

    expect(prisma.quizSubmission.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        skip: 0,
        take: 20,
        orderBy: { createdAt: 'desc' },
        include: { suggestion: { select: { parameters: true } } },
      }),
    );
  });

  it('keeps a null country in the filter instead of dropping it', async () => {
    // `undefined` would mean "any country"; null means "no country".
    const prisma = makePrisma();

    await makeRepository(prisma).list({ originCountry: null }, 0, 20);

    expect(prisma.quizSubmission.findMany.mock.calls[0][0].where).toEqual({
      originCountry: null,
    });
  });

  it('does not bound the window when asked for everything', async () => {
    const prisma = makePrisma();

    await makeRepository(prisma).countTotals(null);

    expect(prisma.quizSubmission.count).toHaveBeenNthCalledWith(1, {
      where: {},
    });
  });

  it('bounds every count by the window it was given', async () => {
    const prisma = makePrisma();
    const from = new Date('2026-09-01T00:00:00Z');

    await makeRepository(prisma).countTotals(from);

    expect(prisma.quizSubmission.count).toHaveBeenNthCalledWith(1, {
      where: { createdAt: { gte: from } },
    });
    expect(prisma.quizSubmission.count).toHaveBeenNthCalledWith(2, {
      where: { createdAt: { gte: from }, originCountry: { not: null } },
    });
    expect(prisma.quizSubmission.count).toHaveBeenNthCalledWith(3, {
      where: { createdAt: { gte: from }, suggestionId: null },
    });
  });

  it('counts only the plans that came from a quiz', async () => {
    const prisma = makePrisma();

    await makeRepository(prisma).countPlansFromQuiz(null);

    expect(prisma.plans.count).toHaveBeenCalledWith({
      where: { suggestion_id: { not: null } },
    });
  });
});
