jest.mock('@app/database', () => ({
  PrismaService: jest.fn(),
  DatabaseModule: jest.fn(),
}));

import { PrismaService } from '@app/database';
import { EventInterestService } from './event-interest.service';

const dto = {
  name: 'Maria Silva',
  contact: '@maria.eventos',
  eventType: 'Live music',
  countryCode: 'PT',
  city: 'Lisbon',
};

describe('EventInterestService', () => {
  let prisma: { eventInterest: { create: jest.Mock } };
  let service: EventInterestService;

  beforeEach(() => {
    prisma = {
      eventInterest: {
        create: jest
          .fn()
          .mockResolvedValue({ id: 'uuid-1', createdAt: new Date() }),
      },
    };
    service = new EventInterestService(prisma as unknown as PrismaService);
  });

  it('stores the interest and returns only id and createdAt', async () => {
    const result = await service.register(dto);

    expect(prisma.eventInterest.create).toHaveBeenCalledWith({
      data: expect.objectContaining({
        city: 'Lisbon',
        contact: '@maria.eventos',
      }),
      select: { id: true, createdAt: true },
    });
    expect(result.id).toBe('uuid-1');
  });

  it('silently discards a submission with the honeypot filled', async () => {
    // A stored bot row would poison the one metric this table exists to
    // produce; answering success tells the bot nothing.
    const result = await service.register({ ...dto, website: 'http://spam' });

    expect(prisma.eventInterest.create).not.toHaveBeenCalled();
    expect(result.id).toBe('discarded');
  });
});
