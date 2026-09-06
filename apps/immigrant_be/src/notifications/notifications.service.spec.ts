/*
 * The prisma double below is `async` throughout with nothing to await: it
 * impersonates an interface that returns promises, and dropping the keyword
 * would make the double stop matching the thing it stands in for. Same reason
 * the itineraries spec disables this rule.
 */
/* eslint-disable @typescript-eslint/require-await */
jest.mock('@app/database', () => ({
  PrismaService: jest.fn(),
  DatabaseModule: jest.fn(),
}));

import { NotFoundException } from '@nestjs/common';
import type { PrismaService } from '@app/database';
import { NotificationsRepository } from './notifications.repository';
import { NotificationsInboxService } from './notifications.service';

interface Row {
  id: string;
  userId: string;
  type: string;
  title: string | null;
  message: string | null;
  payload: Record<string, unknown> | null;
  status: 'pending' | 'delivered' | 'failed';
  readAt: Date | null;
  createdAt: Date;
}

/**
 * A prisma double that actually stores rows.
 *
 * Plain mocks would let every assertion here pass against a method that was
 * called with the right arguments and did nothing — and the whole point of this
 * spec is that the *rows* end up right: that B's `read-all` really leaves A's
 * alone, and that marking twice really keeps the first timestamp.
 */
function fakePrisma(seed: Row[]) {
  const rows = new Map(seed.map((row) => [row.id, { ...row }]));

  const matches = (row: Row, where: Record<string, unknown>) =>
    Object.entries(where).every(([key, value]) =>
      value === null
        ? row[key as keyof Row] === null
        : row[key as keyof Row] === value,
    );

  const events = {
    findMany: jest.fn(
      async ({
        where,
        skip = 0,
        take = 20,
      }: {
        where: Record<string, unknown>;
        skip?: number;
        take?: number;
      }) =>
        [...rows.values()]
          .filter((row) => matches(row, where))
          .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
          .slice(skip, skip + take)
          .map((row) => ({ ...row })),
    ),
    count: jest.fn(
      async ({ where }: { where: Record<string, unknown> }) =>
        [...rows.values()].filter((row) => matches(row, where)).length,
    ),
    findFirst: jest.fn(
      async ({ where }: { where: Record<string, unknown> }) => {
        const found = [...rows.values()].find((row) => matches(row, where));
        return found ? { ...found } : null;
      },
    ),
    updateMany: jest.fn(
      async ({
        where,
        data,
      }: {
        where: Record<string, unknown>;
        data: { readAt: Date };
      }) => {
        const hit = [...rows.values()].filter((row) => matches(row, where));
        for (const row of hit) row.readAt = data.readAt;
        return { count: hit.length };
      },
    ),
  };

  return {
    events,
    $transaction: async (ops: Promise<unknown>[]) => Promise.all(ops),
    snapshot: () => [...rows.values()].map((row) => ({ ...row })),
  };
}

const row = (over: Partial<Row> & Pick<Row, 'id' | 'userId'>): Row => ({
  type: 'business_page_approved',
  title: null,
  message: null,
  payload: { businessName: 'Cantinho da Ana' },
  status: 'delivered',
  readAt: null,
  createdAt: new Date('2026-09-01T10:00:00Z'),
  ...over,
});

function build(seed: Row[]) {
  const prisma = fakePrisma(seed);
  const repository = new NotificationsRepository(
    prisma as unknown as PrismaService,
  );
  return { prisma, service: new NotificationsInboxService(repository) };
}

describe('NotificationsInboxService', () => {
  describe('listing', () => {
    it('shows only my own, newest first', async () => {
      const { service } = build([
        row({
          id: 'a-old',
          userId: 'user-a',
          createdAt: new Date('2026-09-01'),
        }),
        row({
          id: 'a-new',
          userId: 'user-a',
          createdAt: new Date('2026-09-03'),
        }),
        row({ id: 'b-one', userId: 'user-b' }),
      ]);

      const page = await service.list('user-a', {});

      expect(page.data.map((n) => n.id)).toEqual(['a-new', 'a-old']);
      expect(page.total).toBe(2);
    });
  });

  describe('the unread count', () => {
    it('counts what nobody has read, not what has been delivered', async () => {
      // The two states are separate on purpose: a notification despatched to a
      // background tab is `delivered` and still unread, and the badge is about
      // the person, not the socket.
      const { service } = build([
        row({ id: '1', userId: 'user-a', status: 'delivered', readAt: null }),
        row({ id: '2', userId: 'user-a', status: 'pending', readAt: null }),
        row({
          id: '3',
          userId: 'user-a',
          status: 'delivered',
          readAt: new Date(),
        }),
      ]);

      expect(await service.unreadCount('user-a')).toEqual({ count: 2 });
    });

    it('counts mine and nobody else’s', async () => {
      const { service } = build([
        row({ id: '1', userId: 'user-a' }),
        row({ id: '2', userId: 'user-b' }),
        row({ id: '3', userId: 'user-b' }),
      ]);

      expect(await service.unreadCount('user-a')).toEqual({ count: 1 });
    });
  });

  describe('marking one as read', () => {
    it('answers 404 for somebody else’s notification', async () => {
      const { service, prisma } = build([row({ id: 'a-1', userId: 'user-a' })]);

      await expect(service.markRead('a-1', 'user-b')).rejects.toBeInstanceOf(
        NotFoundException,
      );
      // And it did not read it on the way to refusing.
      expect(prisma.snapshot()[0].readAt).toBeNull();
    });

    it('answers 404 for an id that does not exist', async () => {
      const { service } = build([row({ id: 'a-1', userId: 'user-a' })]);

      await expect(
        service.markRead('nao-existe', 'user-a'),
      ).rejects.toBeInstanceOf(NotFoundException);
    });

    it('keeps the first timestamp when marked again', async () => {
      // Idempotent in the sense that matters: reopening the panel must not
      // rewrite when the person actually saw it.
      const { service, prisma } = build([row({ id: 'a-1', userId: 'user-a' })]);

      const first = await service.markRead('a-1', 'user-a');
      const again = await service.markRead('a-1', 'user-a');

      expect(first.readAt).not.toBeNull();
      expect(again.readAt).toEqual(first.readAt);
      expect(prisma.snapshot()[0].readAt).toEqual(first.readAt);
    });
  });

  describe('marking all as read', () => {
    it('reports how many were unread, and stops counting them', async () => {
      const { service } = build([
        row({ id: '1', userId: 'user-a' }),
        row({ id: '2', userId: 'user-a' }),
        row({ id: '3', userId: 'user-a', readAt: new Date('2026-08-01') }),
      ]);

      expect(await service.markAllRead('user-a')).toEqual({ updated: 2 });
      expect(await service.unreadCount('user-a')).toEqual({ count: 0 });
    });

    it('does not touch anybody else’s', async () => {
      const { service, prisma } = build([
        row({ id: 'a-1', userId: 'user-a' }),
        row({ id: 'b-1', userId: 'user-b' }),
      ]);

      await service.markAllRead('user-a');

      const outro = prisma.snapshot().find((r) => r.id === 'b-1');
      expect(outro?.readAt).toBeNull();
    });

    it('answers zero rather than failing when there is nothing to mark', async () => {
      const { service } = build([
        row({ id: 'a-1', userId: 'user-a', readAt: new Date() }),
      ]);

      expect(await service.markAllRead('user-a')).toEqual({ updated: 0 });
    });
  });
});
