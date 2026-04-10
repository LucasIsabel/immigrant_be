jest.mock('@app/database', () => ({
  PrismaService: jest.fn(),
  DatabaseModule: jest.fn(),
}));

jest.mock('@app/storage', () => ({
  StorageService: jest.fn(),
  StorageModule: jest.fn(),
}));

jest.mock('@app/config', () => ({
  env: { FRONTEND_URL: 'https://app.test' },
  ConfigModule: jest.fn(),
}));

jest.mock('@app/email', () => ({
  EmailService: jest.fn(),
  buildApprovalEmail: jest.fn().mockReturnValue({ subject: 's', html: 'h' }),
  buildRejectionEmail: jest.fn().mockReturnValue({ subject: 's', html: 'h' }),
}));

jest.mock('../publisher-qualification/publisher-qualification.service', () => ({
  PublisherQualificationService: jest.fn(),
}));

import { Test } from '@nestjs/testing';
import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { BusinessPageModerationService } from './business-page-moderation.service';
import { BusinessPagesService } from './business-pages.service';
import { BusinessPagesRepository } from './business-pages.repository';
import { buildRejectionEmail, EmailService } from '@app/email';
import { PublisherQualificationService } from '../publisher-qualification/publisher-qualification.service';
import { StorageService } from '@app/storage';

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
  updateBusinessTypeData: jest.fn(),
};

const mockEmail = {
  send: jest.fn(),
};

const mockQualification = {
  isQualified: jest.fn().mockResolvedValue(false),
  onPageApproved: jest.fn().mockResolvedValue(undefined),
  onPageRejected: jest.fn().mockResolvedValue(undefined),
};

const mockStorage = {
  uploadFileAtKey: jest.fn(),
};

const mockModeration = {
  moderateContent: jest.fn(),
};

describe('BusinessPagesService', () => {
  let service: BusinessPagesService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        BusinessPagesService,
        { provide: BusinessPagesRepository, useValue: mockRepo },
        { provide: EmailService, useValue: mockEmail },
        { provide: PublisherQualificationService, useValue: mockQualification },
        { provide: StorageService, useValue: mockStorage },
        { provide: BusinessPageModerationService, useValue: mockModeration },
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

    it('returns the page when status is APPROVED_WITH_PENDING (old content stays live)', async () => {
      const page = {
        id: 'uuid',
        slug: 'meu-slug',
        status: 'APPROVED_WITH_PENDING',
        approvedContent: { name: 'Old content' },
        pendingContent: { name: 'New content under review' },
      };
      mockRepo.findApprovedBySlug.mockResolvedValue(page);
      const result = await service.getPublicPage('meu-slug');
      expect(result).toEqual(page);
    });
  });

  describe('createPage', () => {
    const dto = {
      businessId: 'biz-1',
      slug: 'padaria-central',
      businessType: 'restaurante',
    };
    const createdDraft = { ...mockPage, status: 'DRAFT', slugLockedAt: null };
    const createdPending = {
      ...mockPage,
      status: 'PENDING_REVIEW',
      submittedAt: new Date(),
      slugLockedAt: null,
    };

    beforeEach(() => {
      mockRepo.findBusinessByIdAndUserId.mockResolvedValue(mockBusiness);
      mockRepo.isSlugTaken.mockResolvedValue(false);
      mockRepo.create.mockResolvedValue(createdDraft);
      mockQualification.isQualified.mockResolvedValue(false);
    });

    it('auto-submits to PENDING_REVIEW when publisher is not qualified', async () => {
      mockRepo.findByBusinessId
        .mockResolvedValueOnce(null) // first call: "no existing page" check
        .mockResolvedValueOnce(createdPending); // second call: return after submit
      mockRepo.submitPage.mockResolvedValue(createdPending);

      const result = await service.createPage('user-1', dto);

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
      expect(mockRepo.submitPage).toHaveBeenCalledWith(
        createdDraft.id,
        'PENDING_REVIEW',
      );
      expect(result?.status).toBe('PENDING_REVIEW');
    });

    it('auto-approves when publisher is qualified', async () => {
      mockQualification.isQualified.mockResolvedValue(true);
      const approvedPage = {
        ...mockPage,
        status: 'APPROVED',
        approvedContent: mockPage.pendingContent,
        pendingContent: null,
      };
      mockRepo.findByBusinessId
        .mockResolvedValueOnce(null) // first call: "no existing page" check
        .mockResolvedValueOnce(approvedPage); // second call: return after approve
      mockRepo.approvePage.mockResolvedValue(approvedPage);
      mockRepo.updateBusinessTypeData.mockResolvedValue({});

      const result = await service.createPage('user-1', dto);

      expect(mockRepo.approvePage).toHaveBeenCalledWith(
        createdDraft.id,
        expect.objectContaining({ name: 'Padaria Central' }),
        true, // setSlugLock = true (slugLockedAt is null on new page)
        null,
      );
      expect(result?.status).toBe('APPROVED');
    });

    it('throws ForbiddenException when business does not belong to user', async () => {
      mockRepo.findBusinessByIdAndUserId.mockResolvedValue(null);
      await expect(service.createPage('other-user', dto)).rejects.toThrow(
        ForbiddenException,
      );
    });

    it('throws ConflictException when page already exists for business', async () => {
      mockRepo.findByBusinessId.mockResolvedValue(mockPage);
      await expect(service.createPage('user-1', dto)).rejects.toThrow(
        ConflictException,
      );
    });

    it('throws ConflictException when slug is already taken', async () => {
      mockRepo.findByBusinessId.mockResolvedValue(null);
      mockRepo.isSlugTaken.mockResolvedValue(true);
      await expect(service.createPage('user-1', dto)).rejects.toThrow(
        ConflictException,
      );
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

    it('passes typeData through to pending_content for restaurant menu', async () => {
      const typeData = { menu: [{ name: 'Prato', price: 10 }] };
      const updatedPage = {
        ...mockPage,
        pendingContent: {
          name: 'Rest',
          city: 'Lx',
          typeData,
        },
      };
      mockRepo.findByIdAndUserId.mockResolvedValue(mockPage);
      mockRepo.updatePendingContent.mockResolvedValue(updatedPage);

      const result = await service.updateContent('page-1', 'user-1', {
        pendingContent: {
          name: 'Rest',
          city: 'Lx',
          typeData,
        },
      });

      expect(mockRepo.updatePendingContent).toHaveBeenCalledWith('page-1', {
        name: 'Rest',
        city: 'Lx',
        typeData,
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

    it('approves directly when publisher is qualified (bypasses PENDING_REVIEW)', async () => {
      const draftPage = {
        ...mockPage,
        status: 'DRAFT',
        approvedContent: null,
        pendingContent: { name: 'Padaria' },
        slugLockedAt: null,
      };
      mockRepo.findByIdAndUserId.mockResolvedValue(draftPage);
      mockQualification.isQualified.mockResolvedValue(true);
      mockRepo.approvePage.mockResolvedValue({
        ...draftPage,
        status: 'APPROVED',
      });

      const result = await service.submitForReview('page-1', 'user-1');

      expect(mockRepo.approvePage).toHaveBeenCalledWith(
        'page-1',
        draftPage.pendingContent,
        true,
        null,
      );
      expect(mockRepo.submitPage).not.toHaveBeenCalled();
      expect(result).toEqual({ modal: 'approved', status: 'APPROVED' });
    });
  });

  describe('getMyPage', () => {
    it('returns the page when it exists and business belongs to user', async () => {
      mockRepo.findBusinessByIdAndUserId.mockResolvedValue(mockBusiness);
      mockRepo.findByBusinessId.mockResolvedValue(mockPage);
      mockQualification.isQualified.mockResolvedValue(false);
      const result = await service.getMyPage('biz-1', 'user-1');
      expect(result).toEqual({ ...mockPage, isPublisherQualified: false });
      expect(mockQualification.isQualified).toHaveBeenCalledWith(mockPage.id);
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

    it('calls onPageApproved after successful approval', async () => {
      const page = {
        ...mockPageWithBusiness,
        status: 'PENDING_REVIEW',
        approvedContent: null,
      };
      mockRepo.findById.mockResolvedValue(page);
      mockRepo.approvePage.mockResolvedValue({ ...page, status: 'APPROVED' });
      mockQualification.onPageApproved.mockResolvedValue(undefined);

      await service.approveBusinessPage('page-1', 'admin-1');

      // onPageApproved is fire-and-forget; just verify it was called
      expect(mockQualification.onPageApproved).toHaveBeenCalledWith('page-1');
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

    it('sends rejection email with isUpdate=true for update rejection', async () => {
      const mockedBuildRejectionEmail = jest.mocked(buildRejectionEmail);
      const page = {
        ...mockPageWithBusiness,
        status: 'APPROVED_WITH_PENDING',
        approvedContent: { name: 'Live' },
      };
      mockRepo.findById.mockResolvedValue(page);
      mockRepo.rejectPage.mockResolvedValue({ ...page, status: 'APPROVED' });
      mockEmail.send.mockResolvedValue(undefined);

      await service.rejectBusinessPage('page-1', 'admin-1', {});

      expect(mockEmail.send).toHaveBeenCalledWith(
        expect.objectContaining({ to: 'owner@email.com' }),
      );
      expect(mockedBuildRejectionEmail).toHaveBeenCalledWith(
        expect.any(String),
        true,
        expect.any(String),
        undefined,
      );
    });

    it('calls onPageRejected after successful rejection', async () => {
      const page = {
        ...mockPageWithBusiness,
        status: 'PENDING_REVIEW',
        approvedContent: null,
      };
      mockRepo.findById.mockResolvedValue(page);
      mockRepo.rejectPage.mockResolvedValue({ ...page, status: 'REJECTED' });
      mockQualification.onPageRejected.mockResolvedValue(undefined);

      await service.rejectBusinessPage('page-1', 'admin-1', {});

      expect(mockQualification.onPageRejected).toHaveBeenCalledWith('page-1');
    });
  });

  describe('uploadImage', () => {
    const pageId = 'page-1';
    const userId = 'user-1';

    beforeEach(() => {
      mockRepo.findByIdAndUserId.mockResolvedValue({
        id: pageId,
        businessId: 'biz-1',
      });
      mockStorage.uploadFileAtKey.mockResolvedValue({
        url: 'https://cdn.example.com/business-pages/biz-1/logo.jpg',
        key: 'business-pages/biz-1/logo.jpg',
      });
    });

    it('uploadLogo — retorna url ao fazer upload de imagem válida', async () => {
      const file = {
        buffer: Buffer.from('img'),
        mimetype: 'image/jpeg',
        size: 100,
      } as Express.Multer.File;

      const result = await service.uploadLogo(pageId, userId, file);

      expect(mockStorage.uploadFileAtKey).toHaveBeenCalledWith(
        file.buffer,
        'business-pages/biz-1/logo.jpg',
        'image/jpeg',
      );
      expect(result).toEqual({
        url: 'https://cdn.example.com/business-pages/biz-1/logo.jpg',
      });
    });

    it('uploadCover — retorna url ao fazer upload de imagem válida', async () => {
      mockStorage.uploadFileAtKey.mockResolvedValue({
        url: 'https://cdn.example.com/business-pages/biz-1/cover.png',
        key: 'business-pages/biz-1/cover.png',
      });
      const file = {
        buffer: Buffer.from('img'),
        mimetype: 'image/png',
        size: 200,
      } as Express.Multer.File;

      const result = await service.uploadCover(pageId, userId, file);

      expect(mockStorage.uploadFileAtKey).toHaveBeenCalledWith(
        file.buffer,
        'business-pages/biz-1/cover.png',
        'image/png',
      );
      expect(result).toEqual({
        url: 'https://cdn.example.com/business-pages/biz-1/cover.png',
      });
    });

    it('uploadLogo — lança ForbiddenException quando página não pertence ao usuário', async () => {
      mockRepo.findByIdAndUserId.mockResolvedValue(null);
      const file = {
        buffer: Buffer.from('x'),
        mimetype: 'image/jpeg',
        size: 10,
      } as Express.Multer.File;

      await expect(service.uploadLogo(pageId, userId, file)).rejects.toThrow(
        ForbiddenException,
      );
      expect(mockStorage.uploadFileAtKey).not.toHaveBeenCalled();
    });

    it('uploadLogo — lança BadRequestException para tipo MIME inválido', async () => {
      const file = {
        buffer: Buffer.from('x'),
        mimetype: 'application/pdf',
        size: 10,
      } as Express.Multer.File;

      await expect(service.uploadLogo(pageId, userId, file)).rejects.toThrow(
        BadRequestException,
      );
      expect(mockRepo.findByIdAndUserId).not.toHaveBeenCalled();
      expect(mockStorage.uploadFileAtKey).not.toHaveBeenCalled();
    });

    it('uploadLogo — lança BadRequestException para ficheiro > 5 MB', async () => {
      const file = {
        buffer: Buffer.from('x'),
        mimetype: 'image/jpeg',
        size: 5 * 1024 * 1024 + 1,
      } as Express.Multer.File;

      await expect(service.uploadLogo(pageId, userId, file)).rejects.toThrow(
        BadRequestException,
      );
      expect(mockRepo.findByIdAndUserId).not.toHaveBeenCalled();
      expect(mockStorage.uploadFileAtKey).not.toHaveBeenCalled();
    });

    it('uploadLogo — lança BadRequestException quando nenhum ficheiro é enviado', async () => {
      await expect(
        service.uploadLogo(
          pageId,
          userId,
          undefined as unknown as Express.Multer.File,
        ),
      ).rejects.toThrow(BadRequestException);
      expect(mockRepo.findByIdAndUserId).not.toHaveBeenCalled();
    });
  });
});
