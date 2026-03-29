jest.mock('@app/database', () => ({
  PrismaService: jest.fn(),
  DatabaseModule: jest.fn(),
}));

import { Test } from '@nestjs/testing';
import {
  ConflictException,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { BusinessPagesService } from './business-pages.service';
import { BusinessPagesRepository } from './business-pages.repository';

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
};

describe('BusinessPagesService', () => {
  let service: BusinessPagesService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        BusinessPagesService,
        { provide: BusinessPagesRepository, useValue: mockRepo },
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
      const page = { id: 'uuid', slug: 'meu-slug', status: 'APPROVED', approvedContent: {} };
      mockRepo.findApprovedBySlug.mockResolvedValue(page);
      const result = await service.getPublicPage('meu-slug');
      expect(result).toEqual(page);
    });

    it('throws NotFoundException when page not found', async () => {
      mockRepo.findApprovedBySlug.mockResolvedValue(null);
      await expect(service.getPublicPage('nao-existe')).rejects.toThrow(NotFoundException);
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
          pendingContent: expect.objectContaining({ name: 'Padaria Central', city: 'Lisboa' }),
        }),
      );
      expect(result.status).toBe('DRAFT');
    });

    it('throws ForbiddenException when business does not belong to user', async () => {
      mockRepo.findBusinessByIdAndUserId.mockResolvedValue(null);
      await expect(
        service.createPage('other-user', { businessId: 'biz-1', slug: 'slug', businessType: 'loja' }),
      ).rejects.toThrow(ForbiddenException);
    });

    it('throws ConflictException when page already exists for business', async () => {
      mockRepo.findBusinessByIdAndUserId.mockResolvedValue(mockBusiness);
      mockRepo.findByBusinessId.mockResolvedValue(mockPage);
      await expect(
        service.createPage('user-1', { businessId: 'biz-1', slug: 'slug', businessType: 'loja' }),
      ).rejects.toThrow(ConflictException);
    });

    it('throws ConflictException when slug is already taken', async () => {
      mockRepo.findBusinessByIdAndUserId.mockResolvedValue(mockBusiness);
      mockRepo.findByBusinessId.mockResolvedValue(null);
      mockRepo.isSlugTaken.mockResolvedValue(true);
      await expect(
        service.createPage('user-1', { businessId: 'biz-1', slug: 'taken-slug', businessType: 'loja' }),
      ).rejects.toThrow(ConflictException);
    });
  });

  describe('updateContent', () => {
    it('updates pending_content and returns updated page', async () => {
      const updatedPage = { ...mockPage, pendingContent: { name: 'Nova Padaria', city: 'Porto' } };
      mockRepo.findByIdAndUserId.mockResolvedValue(mockPage);
      mockRepo.updatePendingContent.mockResolvedValue(updatedPage);

      const result = await service.updateContent('page-1', 'user-1', {
        pendingContent: { name: 'Nova Padaria', city: 'Porto' },
      });

      expect(mockRepo.updatePendingContent).toHaveBeenCalledWith('page-1', { name: 'Nova Padaria', city: 'Porto' });
      expect(result).toEqual(updatedPage);
    });

    it('throws ForbiddenException when page does not belong to user', async () => {
      mockRepo.findByIdAndUserId.mockResolvedValue(null);
      await expect(
        service.updateContent('page-1', 'other-user', { pendingContent: { name: 'x', city: 'y' } }),
      ).rejects.toThrow(ForbiddenException);
    });
  });

  describe('submitForReview', () => {
    it('transitions DRAFT to PENDING_REVIEW and returns modal: "first"', async () => {
      const draftPage = { ...mockPage, status: 'DRAFT', approvedContent: null };
      mockRepo.findByIdAndUserId.mockResolvedValue(draftPage);
      mockRepo.submitPage.mockResolvedValue({ ...draftPage, status: 'PENDING_REVIEW' });

      const result = await service.submitForReview('page-1', 'user-1');

      expect(mockRepo.submitPage).toHaveBeenCalledWith('page-1', 'PENDING_REVIEW');
      expect(result).toEqual({ modal: 'first', status: 'PENDING_REVIEW' });
    });

    it('transitions REJECTED to PENDING_REVIEW and returns modal: "update" when previously approved', async () => {
      const rejectedPage = { ...mockPage, status: 'REJECTED', approvedContent: { name: 'Padaria' } };
      mockRepo.findByIdAndUserId.mockResolvedValue(rejectedPage);
      mockRepo.submitPage.mockResolvedValue({ ...rejectedPage, status: 'PENDING_REVIEW' });

      const result = await service.submitForReview('page-1', 'user-1');

      expect(mockRepo.submitPage).toHaveBeenCalledWith('page-1', 'PENDING_REVIEW');
      expect(result).toEqual({ modal: 'update', status: 'PENDING_REVIEW' });
    });

    it('transitions APPROVED to APPROVED_WITH_PENDING and returns modal: "update"', async () => {
      const approvedPage = {
        ...mockPage,
        status: 'APPROVED',
        approvedContent: { name: 'Padaria' },
      };
      mockRepo.findByIdAndUserId.mockResolvedValue(approvedPage);
      mockRepo.submitPage.mockResolvedValue({ ...approvedPage, status: 'APPROVED_WITH_PENDING' });

      const result = await service.submitForReview('page-1', 'user-1');

      expect(mockRepo.submitPage).toHaveBeenCalledWith('page-1', 'APPROVED_WITH_PENDING');
      expect(result).toEqual({ modal: 'update', status: 'APPROVED_WITH_PENDING' });
    });

    it('throws ConflictException when status is PENDING_REVIEW', async () => {
      mockRepo.findByIdAndUserId.mockResolvedValue({ ...mockPage, status: 'PENDING_REVIEW' });
      await expect(service.submitForReview('page-1', 'user-1')).rejects.toThrow(ConflictException);
    });

    it('throws ConflictException when status is APPROVED_WITH_PENDING', async () => {
      mockRepo.findByIdAndUserId.mockResolvedValue({ ...mockPage, status: 'APPROVED_WITH_PENDING' });
      await expect(service.submitForReview('page-1', 'user-1')).rejects.toThrow(ConflictException);
    });

    it('throws ForbiddenException when page does not belong to user', async () => {
      mockRepo.findByIdAndUserId.mockResolvedValue(null);
      await expect(service.submitForReview('page-1', 'other-user')).rejects.toThrow(ForbiddenException);
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
      await expect(service.getMyPage('biz-1', 'other-user')).rejects.toThrow(ForbiddenException);
    });

    it('throws NotFoundException when no page exists for business', async () => {
      mockRepo.findBusinessByIdAndUserId.mockResolvedValue(mockBusiness);
      mockRepo.findByBusinessId.mockResolvedValue(null);
      await expect(service.getMyPage('biz-1', 'user-1')).rejects.toThrow(NotFoundException);
    });
  });
});
