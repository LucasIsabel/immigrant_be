jest.mock('@app/database', () => ({
  PrismaService: jest.fn(),
  DatabaseModule: jest.fn(),
}));

jest.mock('@app/email', () => ({
  EmailService: jest.fn(),
  EmailModule: jest.fn(),
}));

import { PrismaService } from '@app/database';
import { EmailService } from '@app/email';
import { Test, TestingModule } from '@nestjs/testing';
import { NotificationsService } from './notifications.service';
import { USER_NOTIFICATION_TYPES } from './notification-types';

const mockPrisma = {
  events: { create: jest.fn() },
  userRoles: { findMany: jest.fn() },
  users: { findUnique: jest.fn() },
};
const mockEmail = { send: jest.fn() };

const notice = {
  type: 'ai_credits_exhausted',
  title: 'Crédito esgotado',
  message: 'A geração caiu para o fallback.',
};

const approval = {
  userId: 'owner-1',
  type: USER_NOTIFICATION_TYPES.BUSINESS_PAGE_APPROVED,
  payload: {
    businessId: 'biz-1',
    businessName: 'Cantinho da Ana',
    businessType: 'RESTAURANT',
    slug: 'cantinho-da-ana',
  },
} as const;

const letter = { subject: 'A sua página foi aprovada', html: '<p>oi</p>' };

describe('NotificationsService', () => {
  let service: NotificationsService;

  beforeEach(async () => {
    jest.clearAllMocks();
    mockPrisma.events.create.mockResolvedValue({});
    mockEmail.send.mockResolvedValue(undefined);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotificationsService,
        { provide: PrismaService, useValue: mockPrisma },
        { provide: EmailService, useValue: mockEmail },
      ],
    }).compile();

    service = module.get(NotificationsService);
  });

  const admins = (...ids: string[]) =>
    mockPrisma.userRoles.findMany.mockResolvedValue(
      ids.map((userId) => ({ userId })),
    );

  const recipient = (emailNotificationsEnabled: boolean, email = 'a@b.c') =>
    mockPrisma.users.findUnique.mockResolvedValue({
      email,
      emailNotificationsEnabled,
    });

  describe('notify', () => {
    it('stores the row unread and pending, carrying facts and no prose', async () => {
      recipient(false);

      await service.notify({ ...approval });

      expect(mockPrisma.events.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          userId: 'owner-1',
          type: 'business_page_approved',
          title: null,
          message: null,
          payload: approval.payload,
          status: 'pending',
        }),
      });
    });

    it('leaves readAt untouched, so the badge counts it', async () => {
      recipient(false);

      await service.notify({ ...approval });

      const [call] = mockPrisma.events.create.mock.calls;
      expect(
        (call[0] as { data: Record<string, unknown> }).data,
      ).not.toHaveProperty('readAt');
    });

    it('sends the e-mail when the recipient still wants e-mail', async () => {
      recipient(true, 'ana@exemplo.pt');

      await service.notify({ ...approval, email: letter });

      expect(mockEmail.send).toHaveBeenCalledWith({
        to: 'ana@exemplo.pt',
        ...letter,
      });
    });

    it('writes the row but sends nothing when they switched e-mail off', async () => {
      // The switch has existed in the profile all along and no emitter read it.
      // This is the assertion that makes it mean something.
      recipient(false);

      await service.notify({ ...approval, email: letter });

      expect(mockPrisma.events.create).toHaveBeenCalledTimes(1);
      expect(mockEmail.send).not.toHaveBeenCalled();
    });

    it('never asks about e-mail when the caller did not offer one', async () => {
      await service.notify({ ...approval });

      expect(mockPrisma.users.findUnique).not.toHaveBeenCalled();
      expect(mockEmail.send).not.toHaveBeenCalled();
    });

    it('does not fail the caller when the mail server does', async () => {
      // Whatever happened is already committed; losing the letter must not
      // look to the caller like losing the approval.
      recipient(true);
      mockEmail.send.mockRejectedValue(new Error('smtp down'));

      await expect(
        service.notify({ ...approval, email: letter }),
      ).resolves.toBeUndefined();
      expect(mockPrisma.events.create).toHaveBeenCalledTimes(1);
    });
  });

  describe('emitToAdmins', () => {
    it('writes one row per admin, not one shared row', async () => {
      // Delivery marks the event `delivered`, so a single shared record would
      // reach ONE admin — whichever poll picked it up first — and vanish for
      // the others. On an alarm, which every one of them needs to see.
      admins('admin-1', 'admin-2');

      await service.emitToAdmins(notice);

      expect(mockPrisma.events.create).toHaveBeenCalledTimes(2);
      const targets = mockPrisma.events.create.mock.calls.map(
        (call) => (call[0] as { data: { userId: string } }).data.userId,
      );
      expect(targets.sort()).toEqual(['admin-1', 'admin-2']);
    });

    it('does not duplicate when one user holds the role twice', async () => {
      admins('admin-1', 'admin-1');

      await service.emitToAdmins(notice);

      expect(mockPrisma.events.create).toHaveBeenCalledTimes(1);
    });

    it('keeps the notice intact in every copy', async () => {
      admins('admin-1');

      await service.emitToAdmins(notice);

      expect(mockPrisma.events.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          userId: 'admin-1',
          type: notice.type,
          title: notice.title,
          message: notice.message,
        }),
      });
    });

    it('does not blow up when no admin is registered', async () => {
      // There is nowhere to send it. Logging beats bringing down the job that
      // was only trying to warn someone.
      admins();

      await expect(service.emitToAdmins(notice)).resolves.toBeUndefined();
      expect(mockPrisma.events.create).not.toHaveBeenCalled();
    });

    it('lets the other admins hear it when one write fails', async () => {
      admins('admin-1', 'admin-2');
      mockPrisma.events.create
        .mockRejectedValueOnce(new Error('row rejected'))
        .mockResolvedValueOnce({});

      await expect(service.emitToAdmins(notice)).resolves.toBeUndefined();
      expect(mockPrisma.events.create).toHaveBeenCalledTimes(2);
    });
  });
});
