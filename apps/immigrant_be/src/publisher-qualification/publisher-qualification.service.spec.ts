jest.mock('@app/database', () => ({
  PrismaService: jest.fn(),
  DatabaseModule: jest.fn(),
}));

jest.mock('@app/config', () => ({
  env: { FRONTEND_URL: 'https://app.test' },
  ConfigModule: jest.fn(),
}));

jest.mock('@app/email', () => ({
  buildApprovalEmail: jest.fn().mockReturnValue({ subject: 's', html: 'h' }),
  EmailModule: jest.fn(),
}));

import { Test } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { NotificationsService } from '@app/notifications/notifications.service';
import { PublisherQualificationService } from './publisher-qualification.service';
import { PublisherQualificationRepository } from './publisher-qualification.repository';

// ── Fixtures ─────────────────────────────────────────────────────────────────

const NOW = new Date('2026-03-30T12:00:00Z');
const THIRTY_ONE_DAYS_AGO = new Date(NOW.getTime() - 31 * 24 * 60 * 60 * 1000);
const NINETY_ONE_DAYS_AGO = new Date(NOW.getTime() - 91 * 24 * 60 * 60 * 1000);
const TWENTY_NINE_DAYS_AGO = new Date(NOW.getTime() - 29 * 24 * 60 * 60 * 1000);

const mockBusiness = {
  name: 'Padaria Central',
  city: 'Lisboa',
  businessPage: {
    id: 'page-1',
    slug: 'padaria-central',
    businessType: 'restaurante',
    status: 'APPROVED',
  },
  user: { emailVerified: true, createdAt: THIRTY_ONE_DAYS_AGO },
};

const baseQual = {
  businessId: 'biz-1',
  isQualified: false,
  qualifiedAt: null,
  totalApprovals: 0,
  lastRejectionAt: null,
  disqualifiedAt: null,
  disqualificationReason: null,
  overrideActive: false,
  overrideValue: null,
  overrideById: null,
  overrideReason: null,
  overrideAt: null,
  updatedAt: NOW,
  business: mockBusiness,
};

const qualifiedQual = {
  ...baseQual,
  isQualified: true,
  qualifiedAt: NINETY_ONE_DAYS_AGO,
  totalApprovals: 3,
};

const mockRepo = {
  findPageBusinessId: jest.fn(),
  findWithBusinessAndUser: jest.fn(),
  findByBusinessId: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  findAll: jest.fn(),
  approvePendingPage: jest.fn(),
};

const mockNotifications = {
  notify: jest.fn(),
};

describe('PublisherQualificationService', () => {
  let service: PublisherQualificationService;

  beforeEach(async () => {
    jest.useFakeTimers().setSystemTime(NOW);
    const module = await Test.createTestingModule({
      providers: [
        PublisherQualificationService,
        { provide: PublisherQualificationRepository, useValue: mockRepo },
        { provide: NotificationsService, useValue: mockNotifications },
      ],
    }).compile();
    service = module.get(PublisherQualificationService);
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe('onPageApproved', () => {
    it('creates record if not yet exists and increments totalApprovals', async () => {
      mockRepo.findPageBusinessId.mockResolvedValue({ businessId: 'biz-1' });
      mockRepo.findWithBusinessAndUser.mockResolvedValue(null);
      mockRepo.create.mockResolvedValue({ ...baseQual });
      mockRepo.update.mockResolvedValue({ ...baseQual, totalApprovals: 1 });

      await service.onPageApproved('page-1');

      expect(mockRepo.create).toHaveBeenCalledWith('biz-1');
      expect(mockRepo.update).toHaveBeenCalledWith(
        'biz-1',
        expect.objectContaining({ totalApprovals: 1 }),
      );
    });

    it('increments totalApprovals on existing record', async () => {
      const existing = { ...baseQual, totalApprovals: 2 };
      mockRepo.findPageBusinessId.mockResolvedValue({ businessId: 'biz-1' });
      mockRepo.findWithBusinessAndUser.mockResolvedValue(existing);
      mockRepo.update.mockResolvedValue({
        ...existing,
        totalApprovals: 3,
        isQualified: true,
      });

      await service.onPageApproved('page-1');

      expect(mockRepo.update).toHaveBeenCalledWith(
        'biz-1',
        expect.objectContaining({ totalApprovals: 3 }),
      );
    });

    it('qualifies publisher when all criteria met (3rd approval)', async () => {
      const existing = { ...baseQual, totalApprovals: 2 };
      mockRepo.findPageBusinessId.mockResolvedValue({ businessId: 'biz-1' });
      mockRepo.findWithBusinessAndUser.mockResolvedValue(existing);
      mockRepo.update.mockResolvedValue({ ...existing, isQualified: true });
      mockRepo.approvePendingPage.mockResolvedValue(null);

      await service.onPageApproved('page-1');

      expect(mockRepo.update).toHaveBeenCalledWith(
        'biz-1',
        expect.objectContaining({ isQualified: true, qualifiedAt: NOW }),
      );
    });

    it('announces an auto-approval as the same news as a manual one', async () => {
      // To the person receiving it, automatic and manual approval are the same
      // event. A second type would only mean two sentences to translate for
      // one thing that happened.
      const pending = {
        ...mockBusiness,
        businessPage: {
          ...mockBusiness.businessPage,
          status: 'PENDING_REVIEW',
        },
      };
      const existing = { ...baseQual, totalApprovals: 2, business: pending };
      mockRepo.findPageBusinessId.mockResolvedValue({ businessId: 'biz-1' });
      mockRepo.findWithBusinessAndUser.mockResolvedValue(existing);
      mockRepo.update.mockResolvedValue({ ...existing, isQualified: true });
      mockRepo.approvePendingPage.mockResolvedValue({
        businessId: 'biz-1',
        business: {
          name: 'Padaria Central',
          userId: 'owner-1',
          user: { email: 'owner@email.com' },
        },
      });

      await service.onPageApproved('page-1');

      expect(mockNotifications.notify).toHaveBeenCalledWith(
        expect.objectContaining({
          userId: 'owner-1',
          type: 'business_page_approved',
          payload: {
            businessId: 'biz-1',
            businessName: 'Padaria Central',
            businessType: 'restaurante',
            slug: 'padaria-central',
          },
          email: { subject: 's', html: 'h' },
        }),
      );
    });

    it('does NOT qualify when account is too young (< 30 days)', async () => {
      const youngUser = {
        ...mockBusiness,
        user: { emailVerified: true, createdAt: TWENTY_NINE_DAYS_AGO },
      };
      const existing = { ...baseQual, totalApprovals: 2, business: youngUser };
      mockRepo.findPageBusinessId.mockResolvedValue({ businessId: 'biz-1' });
      mockRepo.findWithBusinessAndUser.mockResolvedValue(existing);
      mockRepo.update.mockResolvedValue(existing);

      await service.onPageApproved('page-1');

      expect(mockRepo.update).toHaveBeenCalledWith(
        'biz-1',
        expect.not.objectContaining({ isQualified: true }),
      );
    });

    it('does nothing when businessPageId not found', async () => {
      mockRepo.findPageBusinessId.mockResolvedValue(null);
      await service.onPageApproved('not-found');
      expect(mockRepo.update).not.toHaveBeenCalled();
    });
  });

  describe('onPageRejected', () => {
    it('updates lastRejectionAt', async () => {
      mockRepo.findPageBusinessId.mockResolvedValue({ businessId: 'biz-1' });
      mockRepo.findWithBusinessAndUser.mockResolvedValue(baseQual);
      mockRepo.update.mockResolvedValue({ ...baseQual, lastRejectionAt: NOW });

      await service.onPageRejected('page-1');

      expect(mockRepo.update).toHaveBeenCalledWith(
        'biz-1',
        expect.objectContaining({ lastRejectionAt: NOW }),
      );
    });

    it('creates record if not yet exists', async () => {
      mockRepo.findPageBusinessId.mockResolvedValue({ businessId: 'biz-1' });
      mockRepo.findWithBusinessAndUser.mockResolvedValue(null);
      mockRepo.create.mockResolvedValue({ ...baseQual });
      mockRepo.update.mockResolvedValue({ ...baseQual, lastRejectionAt: NOW });

      await service.onPageRejected('page-1');

      expect(mockRepo.create).toHaveBeenCalledWith('biz-1');
    });

    it('disqualifies a previously qualified publisher', async () => {
      const qual = { ...qualifiedQual };
      mockRepo.findPageBusinessId.mockResolvedValue({ businessId: 'biz-1' });
      mockRepo.findWithBusinessAndUser.mockResolvedValue(qual);
      mockRepo.update.mockResolvedValue({ ...qual, isQualified: false });

      await service.onPageRejected('page-1');

      expect(mockRepo.update).toHaveBeenCalledWith(
        'biz-1',
        expect.objectContaining({ isQualified: false, disqualifiedAt: NOW }),
      );
    });

    it('does nothing when businessPageId not found', async () => {
      mockRepo.findPageBusinessId.mockResolvedValue(null);
      await service.onPageRejected('not-found');
      expect(mockRepo.update).not.toHaveBeenCalled();
    });
  });

  describe('isQualified', () => {
    it('returns true when qualified record exists', async () => {
      mockRepo.findPageBusinessId.mockResolvedValue({ businessId: 'biz-1' });
      mockRepo.findByBusinessId.mockResolvedValue({ ...qualifiedQual });
      const result = await service.isQualified('page-1');
      expect(result).toBe(true);
    });

    it('returns false when no record exists', async () => {
      mockRepo.findPageBusinessId.mockResolvedValue({ businessId: 'biz-1' });
      mockRepo.findByBusinessId.mockResolvedValue(null);
      const result = await service.isQualified('page-1');
      expect(result).toBe(false);
    });

    it('returns false when record is not qualified', async () => {
      mockRepo.findPageBusinessId.mockResolvedValue({ businessId: 'biz-1' });
      mockRepo.findByBusinessId.mockResolvedValue({ ...baseQual });
      const result = await service.isQualified('page-1');
      expect(result).toBe(false);
    });

    it('returns false when businessPageId not found', async () => {
      mockRepo.findPageBusinessId.mockResolvedValue(null);
      const result = await service.isQualified('page-1');
      expect(result).toBe(false);
    });
  });

  describe('applyOverride', () => {
    it('sets override and qualifies publisher when value=true', async () => {
      mockRepo.findWithBusinessAndUser.mockResolvedValue(baseQual);
      mockRepo.update.mockResolvedValue({
        ...baseQual,
        overrideActive: true,
        overrideValue: true,
        isQualified: true,
      });
      mockRepo.approvePendingPage.mockResolvedValue(null);

      await service.applyOverride('biz-1', 'admin-1', {
        value: true,
        reason: 'Publisher confiável',
      });

      expect(mockRepo.update).toHaveBeenCalledWith(
        'biz-1',
        expect.objectContaining({
          overrideActive: true,
          overrideValue: true,
          overrideById: 'admin-1',
          overrideReason: 'Publisher confiável',
          overrideAt: NOW,
          isQualified: true,
        }),
      );
    });

    it('blocks publisher when value=false', async () => {
      mockRepo.findWithBusinessAndUser.mockResolvedValue(qualifiedQual);
      mockRepo.update.mockResolvedValue({
        ...qualifiedQual,
        overrideActive: true,
        overrideValue: false,
        isQualified: false,
      });

      await service.applyOverride('biz-1', 'admin-1', {
        value: false,
        reason: 'Conteúdo suspeito',
      });

      expect(mockRepo.update).toHaveBeenCalledWith(
        'biz-1',
        expect.objectContaining({
          isQualified: false,
          overrideValue: false,
        }),
      );
    });

    it('creates record if not yet exists (upsert behavior)', async () => {
      mockRepo.findWithBusinessAndUser.mockResolvedValue(null);
      mockRepo.create.mockResolvedValue({ ...baseQual });
      mockRepo.update.mockResolvedValue({
        ...baseQual,
        overrideActive: true,
        overrideValue: true,
        isQualified: true,
      });
      mockRepo.approvePendingPage.mockResolvedValue(null);

      const result = await service.applyOverride('biz-1', 'admin-1', {
        value: true,
        reason: 'Publisher confiável',
      });

      expect(mockRepo.create).toHaveBeenCalledWith('biz-1');
      expect(result.businessId).toBe('biz-1');
    });
  });

  describe('removeOverride', () => {
    it('clears override and re-evaluates criteria', async () => {
      const overridden = {
        ...qualifiedQual,
        overrideActive: true,
        overrideValue: true,
        overrideById: 'admin-1',
        overrideReason: 'Force qualified',
        overrideAt: NOW,
        totalApprovals: 0,
      };
      mockRepo.findWithBusinessAndUser.mockResolvedValue(overridden);
      mockRepo.update.mockResolvedValue({
        ...overridden,
        overrideActive: false,
        overrideValue: null,
        overrideById: null,
        overrideReason: null,
        overrideAt: null,
        isQualified: false,
      });

      await service.removeOverride('biz-1');

      expect(mockRepo.update).toHaveBeenCalledWith(
        'biz-1',
        expect.objectContaining({
          overrideActive: false,
          overrideValue: null,
          overrideById: null,
          overrideReason: null,
          overrideAt: null,
          isQualified: false,
        }),
      );
    });

    it('throws NotFoundException when businessId not found', async () => {
      mockRepo.findWithBusinessAndUser.mockResolvedValue(null);
      await expect(service.removeOverride('biz-1')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('listAll', () => {
    it('returns mapped views for all records', async () => {
      mockRepo.findAll.mockResolvedValue([{ ...qualifiedQual }]);
      const result = await service.listAll();
      expect(result).toHaveLength(1);
      expect(result[0]).toMatchObject({
        businessId: 'biz-1',
        businessName: 'Padaria Central',
        isQualified: true,
        criteria: expect.objectContaining({
          approvalsCount: 3,
          approvalsRequired: 3,
        }),
      });
    });
  });

  describe('findOne', () => {
    it('returns the view for a specific businessId', async () => {
      mockRepo.findWithBusinessAndUser.mockResolvedValue({ ...qualifiedQual });
      const result = await service.findOne('biz-1');
      expect(result.businessId).toBe('biz-1');
    });

    it('throws NotFoundException when not found', async () => {
      mockRepo.findWithBusinessAndUser.mockResolvedValue(null);
      await expect(service.findOne('biz-1')).rejects.toThrow(NotFoundException);
    });
  });
});
