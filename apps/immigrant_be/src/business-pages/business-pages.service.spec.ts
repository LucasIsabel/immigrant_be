jest.mock('@app/database', () => ({
  PrismaService: jest.fn(),
  DatabaseModule: jest.fn(),
}));

import { Test } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { BusinessPagesService } from './business-pages.service';
import { BusinessPagesRepository } from './business-pages.repository';

const mockRepo = {
  isSlugTaken: jest.fn(),
  findApprovedBySlug: jest.fn(),
  findBySlug: jest.fn(),
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
});
