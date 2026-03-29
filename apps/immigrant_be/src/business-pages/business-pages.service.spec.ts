jest.mock('@app/database', () => ({
  PrismaService: jest.fn(),
  DatabaseModule: jest.fn(),
}));

jest.mock('@app/email', () => ({
  EmailService: jest.fn(),
  buildApprovalEmail: jest.fn().mockReturnValue({ subject: 's', html: 'h' }),
  buildRejectionEmail: jest.fn().mockReturnValue({ subject: 's', html: 'h' }),
}));

import { Test } from '@nestjs/testing';
import {
  ConflictException,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { BusinessPagesService } from './business-pages.service';
import { BusinessPagesRepository } from './business-pages.repository';
import { EmailService } from '@app/email';

const mockBusiness = {
  id: 'biz-1',
  userId: 'user-1',
  name: 'Padaria Central',
  city: 'Lisboa',
  address: 'Rua das Flores, 1',
  phone: '+351912345678',
  email: 'padaria@email.com',
  website: 'https://padaria.pt',
  lat: 38.7,
  lng: -9.1,
};

const mockPage = {
  id: 'page-1',
  businessId: 'biz-1',
  slug: 'padaria-central',
  businessType: 'restaurante',
  status: 'DRAFT',
  pendingContent: { name: 'Padaria Central', city: 'Lisboa' },
  approvedContent: null,
  submittedAt: null,
  approvedAt: null,
};

const mockPageWithBusiness = {
  ...mockPage,
  businessId: 'biz-1',
  slug: 'padaria-central',
  businessType: 'restaurante',
  slugLockedAt: null,
  rejectedAt: null,
  rejectionReason: null,
  business: {
    name: 'Padaria Central',
    userId: 'user-1',
    user: { email: 'owner@email.com', name: 'Owner' },
  },
};

const mockRepo = {
  isSlugTaken: jest.fn(),
  findApprovedBySlug: jest.fn(),
  findBySlug: jest.fn(),
  findBusinessByIdAndUserId: jest.fn(),
  findByBusinessId: jest.fn(),
  findByIdAndUserId: jest.fn(),
  create: jest.fn(),
  updatePendingContent: jest.fn(),
  submitPage: jest.fn(),
  // NEW:
  findById: jest.fn(),
  listPages: jest.fn(),
  approvePage: jest.fn(),
  rejectPage: jest.fn(),
};

const mockEmail = {
  send: jest.fn(),
};

describe('BusinessPagesService', () => {
  let service: BusinessPagesService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        BusinessPagesService,
        { provide: BusinessPagesRepository, useValue: mockRepo },
        { provide: EmailService, useValue: mockEmail },
      ],
    }).compile();
    service = module.get(BusinessPagesService);
    jest.clearAllMocks();
  });

  describe('checkSlugAvailability', () => {
    it('returns available: true when slug is not taken', async () => {
      mockRepo.isSlugTaken.mockResolvedValue(false);
      const result = await service.checkSlugAvailability('meu-slug');
      expect(result).toEqual({ available: true, slug: 'meu-slug' });
    });

    it('returns available: false when slug is taken', async () => {
      mockRepo.isSlugTaken.mockResolvedValue(true);
      const result = await service.checkSlugAvailability('meu-slug');
      expect(result).toEqual({ available: false, slug: 'meu-slug' });
    });
  });

  describe('getPublicPage', () => {
    it('returns the page when found and approved', async () => {
      const page = {
        id: 'uuid',
        slug: 'meu-slug',
        status: 'APPROVED',
        approvedContent: {},
      };
      mockRepo.findApprovedBySlug.mockResolvedValue(page);
      const result = await service.getPublicPage('meu-slug');
      expect(result).toEqual(page);
    });

    it('throws NotFoundException when page not found', async () => {
      mockRepo.findApprovedBySlug.mockResolvedValue(null);
      await expect(service.getPublicPage('nao-existe')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('createPage', () => {
    it('creates a DRAFT page pre-populated from business', async () => {
      mockRepo.findBusinessByIdAndUserId.mockResolvedValue(mockBusiness);
      mockRepo.findByBusinessId.mockResolvedValue(null);
      mockRepo.isSlugTaken.mockResolvedValue(false);
      mockRepo.create.mockResolvedValue({ ...mockPage, status: 'DRAFT' });

      const result = await service.createPage('user-1', {
        businessId: 'biz-1',
        slug: 'padaria-central',
        businessType: 'restaurante',
      });

      expect(mockRepo.create).toHaveBeenCalledWith(
        expect.objectContaining({
          businessId: 'biz-1',
          slug: 'padaria-central',
          businessType: 'restaurante',
          pendingContent: expect.objectContaining({
            name: 'Padaria Central',
            city: 'Lisboa',
          }),
        }),
      );
      expect(result.status).toBe('DRAFT');
    });

    it('throws ForbiddenException when business does not belong to user', async () => {
      mockRepo.findBusinessByIdAndUserId.mockResolvedValue(null);
      await expect(
        service.createPage('other-user', {
          businessId: 'biz-1',
          slug: 'slug',
          businessType: 'loja',
        }),
      ).rejects.toThrow(ForbiddenException);
    });

    it('throws ConflictException when page already exists for business', async () => {
      mockRepo.findBusinessByIdAndUserId.mockResolvedValue(mockBusiness);
      mockRepo.findByBusinessId.mockResolvedValue(mockPage);
      await expect(
        service.createPage('user-1', {
          businessId: 'biz-1',
          slug: 'slug',
          businessType: 'loja',
        }),
      ).rejects.toThrow(ConflictException);
    });

    it('throws ConflictException when slug is already taken', async () => {
      mockRepo.findBusinessByIdAndUserId.mockResolvedValue(mockBusiness);
      mockRepo.findByBusinessId.mockResolvedValue(null);
      mockRepo.isSlugTaken.mockResolvedValue(true);
      await expect(
        service.createPage('user-1', {
          businessId: 'biz-1',
          slug: 'taken-slug',
          businessType: 'loja',
        }),
      ).rejects.toThrow(ConflictException);
    });
  });

  describe('updateContent', () => {
    it('updates pending_content and returns updated page', async () => {
      const updatedPage = {
        ...mockPage,
        pendingContent: { name: 'Nova Padaria', city: 'Porto' },
      };
      mockRepo.findByIdAndUserId.mockResolvedValue(mockPage);
      mockRepo.updatePendingContent.mockResolvedValue(updatedPage);

      const result = await service.updateContent('page-1', 'user-1', {
        pendingContent: { name: 'Nova Padaria', city: 'Porto' },
      });

      expect(mockRepo.updatePendingContent).toHaveBeenCalledWith('page-1', {
        name: 'Nova Padaria',
        city: 'Porto',
      });
      expect(result).toEqual(updatedPage);
    });

    it('throws ForbiddenException when page does not belong to user', async () => {
      mockRepo.findByIdAndUserId.mockResolvedValue(null);
      await expect(
        service.updateContent('page-1', 'other-user', {
          pendingContent: { name: 'x', city: 'y' },
        }),
      ).rejects.toThrow(ForbiddenException);
    });
  });

  describe('submitForReview', () => {
    it('transitions DRAFT to PENDING_REVIEW and returns modal: "first"', async () => {
      const draftPage = { ...mockPage, status: 'DRAFT', approvedContent: null };
      mockRepo.findByIdAndUserId.mockResolvedValue(draftPage);
      mockRepo.submitPage.mockResolvedValue({
        ...draftPage,
        status: 'PENDING_REVIEW',
      });

      const result = await service.submitForReview('page-1', 'user-1');

      expect(mockRepo.submitPage).toHaveBeenCalledWith(
        'page-1',
        'PENDING_REVIEW',
      );
      expect(result).toEqual({ modal: 'first', status: 'PENDING_REVIEW' });
    });

    it('transitions REJECTED to PENDING_REVIEW and returns modal: "update" when previously approved', async () => {
      const rejectedPage = {
        ...mockPage,
        status: 'REJECTED',
        approvedContent: { name: 'Padaria' },
      };
      mockRepo.findByIdAndUserId.mockResolvedValue(rejectedPage);
      mockRepo.submitPage.mockResolvedValue({
        ...rejectedPage,
        status: 'PENDING_REVIEW',
      });

      const result = await service.submitForReview('page-1', 'user-1');

      expect(mockRepo.submitPage).toHaveBeenCalledWith(
        'page-1',
        'PENDING_REVIEW',
      );
      expect(result).toEqual({ modal: 'update', status: 'PENDING_REVIEW' });
    });

    it('transitions APPROVED to APPROVED_WITH_PENDING and returns modal: "update"', async () => {
      const approvedPage = {
        ...mockPage,
        status: 'APPROVED',
        approvedContent: { name: 'Padaria' },
      };
      mockRepo.findByIdAndUserId.mockResolvedValue(approvedPage);
      mockRepo.submitPage.mockResolvedValue({
        ...approvedPage,
        status: 'APPROVED_WITH_PENDING',
      });

      const result = await service.submitForReview('page-1', 'user-1');

      expect(mockRepo.submitPage).toHaveBeenCalledWith(
        'page-1',
        'APPROVED_WITH_PENDING',
      );
      expect(result).toEqual({
        modal: 'update',
        status: 'APPROVED_WITH_PENDING',
      });
    });

    it('throws ConflictException when status is PENDING_REVIEW', async () => {
      mockRepo.findByIdAndUserId.mockResolvedValue({
        ...mockPage,
        status: 'PENDING_REVIEW',
      });
      await expect(service.submitForReview('page-1', 'user-1')).rejects.toThrow(
        ConflictException,
      );
    });

    it('throws ConflictException when status is APPROVED_WITH_PENDING', async () => {
      mockRepo.findByIdAndUserId.mockResolvedValue({
        ...mockPage,
        status: 'APPROVED_WITH_PENDING',
      });
      await expect(service.submitForReview('page-1', 'user-1')).rejects.toThrow(
        ConflictException,
      );
    });

    it('throws ForbiddenException when page does not belong to user', async () => {
      mockRepo.findByIdAndUserId.mockResolvedValue(null);
      await expect(
        service.submitForReview('page-1', 'other-user'),
      ).rejects.toThrow(ForbiddenException);
    });
  });

  describe('getMyPage', () => {
    it('returns the page when it exists and business belongs to user', async () => {
      mockRepo.findBusinessByIdAndUserId.mockResolvedValue(mockBusiness);
      mockRepo.findByBusinessId.mockResolvedValue(mockPage);
      const result = await service.getMyPage('biz-1', 'user-1');
      expect(result).toEqual(mockPage);
    });

    it('throws ForbiddenException when business does not belong to user', async () => {
      mockRepo.findBusinessByIdAndUserId.mockResolvedValue(null);
      await expect(service.getMyPage('biz-1', 'other-user')).rejects.toThrow(
        ForbiddenException,
      );
    });

    it('throws NotFoundException when no page exists for business', async () => {
      mockRepo.findBusinessByIdAndUserId.mockResolvedValue(mockBusiness);
      mockRepo.findByBusinessId.mockResolvedValue(null);
      await expect(service.getMyPage('biz-1', 'user-1')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('listPages', () => {
    it('returns all pages when no status given', async () => {
      mockRepo.listPages.mockResolvedValue([mockPageWithBusiness]);
      const result = await service.listPages();
      expect(mockRepo.listPages).toHaveBeenCalledWith(undefined);
      expect(result).toHaveLength(1);
    });

    it('returns pages filtered by status', async () => {
      mockRepo.listPages.mockResolvedValue([mockPageWithBusiness]);
      const result = await service.listPages('PENDING_REVIEW');
      expect(mockRepo.listPages).toHaveBeenCalledWith('PENDING_REVIEW');
      expect(result).toHaveLength(1);
    });
  });

  describe('approveBusinessPage', () => {
    it('approves PENDING_REVIEW page, copies pendingContent, sends approval email', async () => {
      const page = {
        ...mockPageWithBusiness,
        status: 'PENDING_REVIEW',
        approvedContent: null,
      };
      mockRepo.findById.mockResolvedValue(page);
      mockRepo.approvePage.mockResolvedValue({ ...page, status: 'APPROVED' });
      mockEmail.send.mockResolvedValue(undefined);

      const result = await service.approveBusinessPage('page-1', 'admin-1');

      expect(mockRepo.approvePage).toHaveBeenCalledWith(
        'page-1',
        page.pendingContent,
        true,
        'admin-1',
      );
      expect(mockEmail.send).toHaveBeenCalledWith(
        expect.objectContaining({ to: 'owner@email.com' }),
      );
      expect(result.status).toBe('APPROVED');
    });

    it('does NOT set slugLockedAt when already locked', async () => {
      const page = {
        ...mockPageWithBusiness,
        status: 'APPROVED_WITH_PENDING',
        slugLockedAt: new Date(),
        approvedContent: { name: 'Padaria' },
      };
      mockRepo.findById.mockResolvedValue(page);
      mockRepo.approvePage.mockResolvedValue({ ...page, status: 'APPROVED' });

      await service.approveBusinessPage('page-1', 'admin-1');

      expect(mockRepo.approvePage).toHaveBeenCalledWith(
        'page-1',
        page.pendingContent,
        false,
        'admin-1',
      );
    });

    it('throws NotFoundException when page not found', async () => {
      mockRepo.findById.mockResolvedValue(null);
      await expect(
        service.approveBusinessPage('page-1', 'admin-1'),
      ).rejects.toThrow(NotFoundException);
    });

    it('throws ConflictException when status is DRAFT', async () => {
      mockRepo.findById.mockResolvedValue({
        ...mockPageWithBusiness,
        status: 'DRAFT',
      });
      await expect(
        service.approveBusinessPage('page-1', 'admin-1'),
      ).rejects.toThrow(ConflictException);
    });

    it('throws ConflictException when status is APPROVED', async () => {
      mockRepo.findById.mockResolvedValue({
        ...mockPageWithBusiness,
        status: 'APPROVED',
        approvedContent: { name: 'x' },
      });
      await expect(
        service.approveBusinessPage('page-1', 'admin-1'),
      ).rejects.toThrow(ConflictException);
    });

    it('still approves and returns page even if email sending throws', async () => {
      const page = {
        ...mockPageWithBusiness,
        status: 'PENDING_REVIEW',
        approvedContent: null,
      };
      mockRepo.findById.mockResolvedValue(page);
      mockRepo.approvePage.mockResolvedValue({ ...page, status: 'APPROVED' });
      mockEmail.send.mockRejectedValue(new Error('SMTP error'));

      const result = await service.approveBusinessPage('page-1', 'admin-1');

      expect(result.status).toBe('APPROVED');
    });
  });

  describe('rejectBusinessPage', () => {
    it('rejects PENDING_REVIEW page (no approvedContent) with status REJECTED', async () => {
      const page = {
        ...mockPageWithBusiness,
        status: 'PENDING_REVIEW',
        approvedContent: null,
      };
      mockRepo.findById.mockResolvedValue(page);
      mockRepo.rejectPage.mockResolvedValue({ ...page, status: 'REJECTED' });

      const result = await service.rejectBusinessPage('page-1', 'admin-1', {});

      expect(mockRepo.rejectPage).toHaveBeenCalledWith(
        'page-1',
        'REJECTED',
        'admin-1',
        undefined,
      );
      expect(result.status).toBe('REJECTED');
    });

    it('reverts APPROVED_WITH_PENDING to APPROVED (live version preserved)', async () => {
      const page = {
        ...mockPageWithBusiness,
        status: 'APPROVED_WITH_PENDING',
        approvedContent: { name: 'Live' },
      };
      mockRepo.findById.mockResolvedValue(page);
      mockRepo.rejectPage.mockResolvedValue({ ...page, status: 'APPROVED' });

      const result = await service.rejectBusinessPage('page-1', 'admin-1', {});

      expect(mockRepo.rejectPage).toHaveBeenCalledWith(
        'page-1',
        'APPROVED',
        'admin-1',
        undefined,
      );
      expect(result.status).toBe('APPROVED');
    });

    it('passes rejection reason to repository', async () => {
      const page = {
        ...mockPageWithBusiness,
        status: 'PENDING_REVIEW',
        approvedContent: null,
      };
      mockRepo.findById.mockResolvedValue(page);
      mockRepo.rejectPage.mockResolvedValue({ ...page, status: 'REJECTED' });

      await service.rejectBusinessPage('page-1', 'admin-1', {
        reason: 'Conteúdo inadequado',
      });

      expect(mockRepo.rejectPage).toHaveBeenCalledWith(
        'page-1',
        'REJECTED',
        'admin-1',
        'Conteúdo inadequado',
      );
    });

    it('sends rejection email to owner', async () => {
      const page = {
        ...mockPageWithBusiness,
        status: 'PENDING_REVIEW',
        approvedContent: null,
      };
      mockRepo.findById.mockResolvedValue(page);
      mockRepo.rejectPage.mockResolvedValue({ ...page, status: 'REJECTED' });
      mockEmail.send.mockResolvedValue(undefined);

      await service.rejectBusinessPage('page-1', 'admin-1', {});

      expect(mockEmail.send).toHaveBeenCalledWith(
        expect.objectContaining({ to: 'owner@email.com' }),
      );
    });

    it('throws NotFoundException when page not found', async () => {
      mockRepo.findById.mockResolvedValue(null);
      await expect(
        service.rejectBusinessPage('page-1', 'admin-1', {}),
      ).rejects.toThrow(NotFoundException);
    });

    it('throws ConflictException when status is DRAFT', async () => {
      mockRepo.findById.mockResolvedValue({
        ...mockPageWithBusiness,
        status: 'DRAFT',
      });
      await expect(
        service.rejectBusinessPage('page-1', 'admin-1', {}),
      ).rejects.toThrow(ConflictException);
    });

    it('still rejects and returns page even if email sending throws', async () => {
      const page = {
        ...mockPageWithBusiness,
        status: 'PENDING_REVIEW',
        approvedContent: null,
      };
      mockRepo.findById.mockResolvedValue(page);
      mockRepo.rejectPage.mockResolvedValue({ ...page, status: 'REJECTED' });
      mockEmail.send.mockRejectedValue(new Error('SMTP error'));

      const result = await service.rejectBusinessPage('page-1', 'admin-1', {});

      expect(result.status).toBe('REJECTED');
    });
  });
});
