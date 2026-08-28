jest.mock('@app/database', () => ({
  PrismaService: jest.fn(),
  DatabaseModule: jest.fn(),
}));

import {
  ConflictException,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { TourGuideReviewsService } from './tour-guide-reviews.service';
import type { TourGuideReviewsRepository } from './tour-guide-reviews.repository';

/** Plain jest.fn() properties, as the other specs here do: a jest.Mocked of
 *  the class makes every assertion an unbound-method lint error. */
function makeRepository() {
  return {
    findByBusinessId: jest.fn(),
    findByBusinessIdAndUserId: jest.fn(),
    findBusinessOwnerId: jest.fn(),
    create: jest.fn(),
    getStats: jest.fn(),
    findIdById: jest.fn(),
    createReport: jest.fn(),
    listForAdmin: jest.fn(),
    findByIdForAdmin: jest.fn(),
    setHidden: jest.fn(),
    delete: jest.fn(),
  };
}

const BUSINESS_ID = 'b0000000-0000-4000-8000-000000000001';
const OWNER_ID = 'u0000000-0000-4000-8000-000000000001';
const VISITOR_ID = 'u0000000-0000-4000-8000-000000000002';
const REVIEW_ID = 'r0000000-0000-4000-8000-000000000001';

function reviewRow(overrides: Record<string, unknown> = {}) {
  return {
    id: REVIEW_ID,
    businessId: BUSINESS_ID,
    userId: VISITOR_ID,
    rating: 5,
    comment: 'Excelente.',
    createdAt: new Date('2026-08-01T10:00:00Z'),
    hiddenAt: null,
    hiddenReason: null,
    user: { name: 'Ana Costa', email: 'ana@example.com' },
    business: { name: 'Rita Andrade' },
    _count: { reports: 0 },
    ...overrides,
  };
}

describe('TourGuideReviewsService', () => {
  let repository: ReturnType<typeof makeRepository>;
  let service: TourGuideReviewsService;

  beforeEach(() => {
    repository = makeRepository();
    service = new TourGuideReviewsService(
      repository as unknown as TourGuideReviewsRepository,
    );
  });

  describe('createReview', () => {
    beforeEach(() => {
      repository.findBusinessOwnerId.mockResolvedValue(OWNER_ID);
      repository.findByBusinessIdAndUserId.mockResolvedValue(null);
      repository.create.mockResolvedValue(reviewRow() as never);
    });

    it('names the review after the account, never after the payload', async () => {
      // The old field was typed by the reviewer, so it could carry any name.
      const result = await service.createReview(BUSINESS_ID, VISITOR_ID, {
        rating: 5,
        authorName: 'Outra Pessoa',
      });

      expect(result.authorName).toBe('Ana Costa');
      expect(repository.create).toHaveBeenCalledWith(
        BUSINESS_ID,
        VISITOR_ID,
        expect.objectContaining({ rating: 5 }),
      );
    });

    it('refuses a guide reviewing their own business', async () => {
      await expect(
        service.createReview(BUSINESS_ID, OWNER_ID, { rating: 5 }),
      ).rejects.toThrow(ForbiddenException);
      expect(repository.create).not.toHaveBeenCalled();
    });

    it('answers 404 for a business that does not exist', async () => {
      // Without this the foreign key would surface as a raw Prisma error.
      repository.findBusinessOwnerId.mockResolvedValue(null);

      await expect(
        service.createReview(BUSINESS_ID, VISITOR_ID, { rating: 5 }),
      ).rejects.toThrow(NotFoundException);
    });

    it('still refuses a second review from the same person', async () => {
      repository.findByBusinessIdAndUserId.mockResolvedValue(
        reviewRow() as never,
      );

      await expect(
        service.createReview(BUSINESS_ID, VISITOR_ID, { rating: 4 }),
      ).rejects.toThrow(ConflictException);
    });

    it('falls back to a neutral name when the profile carries none', async () => {
      repository.create.mockResolvedValue(
        reviewRow({ user: { name: '  ' } }) as never,
      );

      const result = await service.createReview(BUSINESS_ID, VISITOR_ID, {
        rating: 5,
      });

      expect(result.authorName).toBe('Usuário');
    });
  });

  describe('listReviews', () => {
    it('names every review after its account and rounds the average', async () => {
      repository.findByBusinessId.mockResolvedValue([
        reviewRow(),
        reviewRow({ id: 'other', user: { name: 'Miguel R.' } }),
      ] as never);
      repository.getStats.mockResolvedValue({ average: 4.666, total: 2 });

      const result = await service.listReviews(BUSINESS_ID);

      expect(result.reviews.map((r) => r.authorName)).toEqual([
        'Ana Costa',
        'Miguel R.',
      ]);
      expect(result.averageRating).toBe(4.7);
      expect(result.totalCount).toBe(2);
    });
  });

  describe('report', () => {
    it('records the reason against the review', async () => {
      repository.findIdById.mockResolvedValue({ id: REVIEW_ID });

      const result = await service.report(REVIEW_ID, {
        reason: 'Acusação sem qualquer elemento que a sustente.',
      });

      expect(repository.createReport).toHaveBeenCalledWith(
        REVIEW_ID,
        'Acusação sem qualquer elemento que a sustente.',
      );
      expect(result).toEqual({ received: true });
    });

    it('drops a report that filled the honeypot, without saying so', async () => {
      const result = await service.report(REVIEW_ID, {
        reason: 'Conteúdo impróprio na avaliação.',
        website: 'http://spam.example.com',
      });

      expect(repository.createReport).not.toHaveBeenCalled();
      expect(repository.findIdById).not.toHaveBeenCalled();
      expect(result).toEqual({ received: true });
    });

    it('answers 404 for a review that does not exist', async () => {
      repository.findIdById.mockResolvedValue(null);

      await expect(
        service.report(REVIEW_ID, { reason: 'Conteúdo impróprio.' }),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('hide and unhide', () => {
    it('records who hid the review and why', async () => {
      repository.findByIdForAdmin.mockResolvedValue(
        reviewRow({ reports: [] }) as never,
      );
      repository.setHidden.mockResolvedValue(
        reviewRow({
          hiddenAt: new Date(),
          hiddenReason: 'Difamação.',
        }) as never,
      );

      const result = await service.hide(REVIEW_ID, OWNER_ID, {
        reason: 'Difamação.',
      });

      expect(repository.setHidden).toHaveBeenCalledWith(REVIEW_ID, {
        at: expect.any(Date),
        byId: OWNER_ID,
        reason: 'Difamação.',
      });
      expect(result.hiddenReason).toBe('Difamação.');
    });

    it('refuses to hide a review that is already hidden', async () => {
      repository.findByIdForAdmin.mockResolvedValue(
        reviewRow({ hiddenAt: new Date(), reports: [] }) as never,
      );

      await expect(
        service.hide(REVIEW_ID, OWNER_ID, { reason: 'Difamação.' }),
      ).rejects.toThrow(ConflictException);
    });

    it('clears the hidden state when bringing a review back', async () => {
      repository.findByIdForAdmin.mockResolvedValue(
        reviewRow({ hiddenAt: new Date(), reports: [] }) as never,
      );
      repository.setHidden.mockResolvedValue(reviewRow() as never);

      await service.unhide(REVIEW_ID);

      expect(repository.setHidden).toHaveBeenCalledWith(REVIEW_ID, null);
    });

    it('refuses to unhide a review that is visible', async () => {
      repository.findByIdForAdmin.mockResolvedValue(
        reviewRow({ reports: [] }) as never,
      );

      await expect(service.unhide(REVIEW_ID)).rejects.toThrow(
        ConflictException,
      );
    });
  });

  describe('remove', () => {
    it('logs who deleted the review and why before it is gone', async () => {
      // Deleting is irreversible, so the reason has to survive the row.
      repository.findIdById.mockResolvedValue({ id: REVIEW_ID });
      const warn = jest
        .spyOn(service['logger'], 'warn')
        .mockImplementation(() => undefined);

      await service.remove(REVIEW_ID, OWNER_ID, {
        reason: 'Contém o telefone de um terceiro.',
      });

      expect(warn).toHaveBeenCalledWith(
        expect.stringContaining('Contém o telefone de um terceiro.'),
      );
      expect(repository.delete).toHaveBeenCalledWith(REVIEW_ID);
    });

    it('answers 404 for a review that does not exist', async () => {
      repository.findIdById.mockResolvedValue(null);

      await expect(
        service.remove(REVIEW_ID, OWNER_ID, { reason: 'Motivo.' }),
      ).rejects.toThrow(NotFoundException);
      expect(repository.delete).not.toHaveBeenCalled();
    });
  });
});
