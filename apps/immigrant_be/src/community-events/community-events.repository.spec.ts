jest.mock('@app/database', () => ({
  PrismaService: jest.fn(),
  DatabaseModule: jest.fn(),
}));

import { Test } from '@nestjs/testing';
import { PrismaService } from '@app/database';
import { Prisma } from '../../../../generated/prisma';
import { CommunityEventsRepository } from './community-events.repository';
import { CommunityEventWhen } from './dto/list-public-community-events-query.dto';

const prisma = {
  // The agenda batches the page and the count; the mock resolves the array it
  // is handed, which is what Prisma does.
  $transaction: jest.fn((ops: unknown[]) => Promise.all(ops)),
  $queryRaw: jest.fn(),
  communityEvent: { findMany: jest.fn(), count: jest.fn() },
  business: { findUnique: jest.fn() },
};

/**
 * "Póvoa de Varzim" and "Povoa de Varzim" are one city, and the agenda used to
 * treat them as two: the typed query ignored case but not accents, and the SQL
 * behind `today` and `weekend` compared `lower(e.city)`. Both now compare the
 * folded key, the way the business directory does.
 */
describe('CommunityEventsRepository and the spelling of a city', () => {
  let repository: CommunityEventsRepository;

  beforeEach(async () => {
    jest.clearAllMocks();
    prisma.communityEvent.findMany.mockResolvedValue([]);
    prisma.communityEvent.count.mockResolvedValue(0);
    prisma.$queryRaw.mockResolvedValue([]);

    const moduleRef = await Test.createTestingModule({
      providers: [
        CommunityEventsRepository,
        { provide: PrismaService, useValue: prisma },
      ],
    }).compile();

    repository = moduleRef.get(CommunityEventsRepository);
  });

  it('lists the agenda by the folded key, so either spelling finds the event', async () => {
    await repository.listPublicUpcoming(
      {
        countryCode: 'PT',
        city: 'Póvoa de Varzim',
        when: CommunityEventWhen.UPCOMING,
      },
      0,
      20,
    );

    const { where } = prisma.communityEvent.findMany.mock.calls[0][0] as {
      where: Record<string, unknown>;
    };
    expect(where).toMatchObject({ cityKey: 'povoa de varzim' });
    expect('city' in where).toBe(false);
  });

  it('compares the key in the SQL behind today and the weekend', async () => {
    await repository.listPublicByWhen(
      {
        countryCode: 'PT',
        city: 'Povoa de Varzim',
        when: CommunityEventWhen.WEEKEND,
      },
      0,
      20,
    );

    // A tagged template: the strings come first, then the interpolated `where`.
    const where = prisma.$queryRaw.mock.calls[0][1] as Prisma.Sql;
    expect(where.sql).toContain('e.city_key = ?');
    expect(where.sql).not.toContain('lower(e.city)');
    expect(where.values).toContain('povoa de varzim');
  });

  it('reads the host business by its keys, not its name', async () => {
    prisma.business.findUnique.mockResolvedValue(null);

    await repository.findBusinessForEvent('biz-1');

    const { select } = prisma.business.findUnique.mock.calls[0][0] as {
      select: Record<string, boolean>;
    };
    expect(select).toMatchObject({ cityKey: true, stateKey: true });
    expect('city' in select).toBe(false);
  });
});
