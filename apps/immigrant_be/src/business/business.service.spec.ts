jest.mock('@app/database', () => ({
  PrismaService: jest.fn(),
  DatabaseModule: jest.fn(),
}));

import { Test, TestingModule } from '@nestjs/testing';
import {
  BadRequestException,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { BusinessService } from './business.service';
import { BusinessRepository } from './business.repository';

const mockBusiness = {
  id: 'business-id-1',
  userId: 'user-id-1',
  businessType: 'RESTAURANT',
  name: 'Test Restaurant',
  description: null,
  city: 'Lisboa',
  address: null,
  phone: null,
  website: null,
  email: null,
  isPublic: false,
  typeData: null,
  createdAt: new Date(),
  updatedAt: new Date(),
} as any;

const mockBusinessRepository = {
  create: jest.fn(),
  findAllByUserId: jest.fn(),
  findByIdAndUserId: jest.fn(),
  update: jest.fn(),
  saveDraft: jest.fn(),
  applyDraftAndClearDraft: jest.fn(),
  clearDraft: jest.fn(),
  delete: jest.fn(),
  toggleVisibility: jest.fn(),
  findPublic: jest.fn(),
  findPublicById: jest.fn(),
};

describe('BusinessService', () => {
  let service: BusinessService;
  let repository: typeof mockBusinessRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BusinessService,
        { provide: BusinessRepository, useValue: mockBusinessRepository },
      ],
    }).compile();

    service = module.get<BusinessService>(BusinessService);
    repository = module.get(BusinessRepository);

    jest.clearAllMocks();
  });

  // ── getMyBusinesses ────────────────────────────────────────

  describe('getMyBusinesses', () => {
    it('should return businesses for userId', async () => {
      repository.findAllByUserId.mockResolvedValue([mockBusiness]);

      const result = await service.getMyBusinesses('user-id-1');

      expect(result).toEqual([mockBusiness]);
    });

    it('should call repository.findAllByUserId with correct userId', async () => {
      repository.findAllByUserId.mockResolvedValue([]);

      await service.getMyBusinesses('user-id-1');

      expect(repository.findAllByUserId).toHaveBeenCalledWith('user-id-1');
    });
  });

  // ── create ─────────────────────────────────────────────────

  describe('create', () => {
    it('should create a business successfully (no typeData)', async () => {
      repository.create.mockResolvedValue(mockBusiness);

      const dto = {
        businessType: 'RESTAURANT' as any,
        name: 'Test Restaurant',
        city: 'Lisboa',
      };

      const result = await service.create('user-id-1', dto);

      expect(result).toEqual(mockBusiness);
      expect(repository.create).toHaveBeenCalledWith('user-id-1', dto);
    });

    it('should create a business with valid typeData for RESTAURANT type', async () => {
      repository.create.mockResolvedValue(mockBusiness);

      const dto = {
        businessType: 'RESTAURANT' as any,
        name: 'Test Restaurant',
        city: 'Lisboa',
        typeData: { cuisine: 'Italiana', priceRange: '$$' },
      };

      const result = await service.create('user-id-1', dto);

      expect(result).toEqual(mockBusiness);
      expect(repository.create).toHaveBeenCalledWith('user-id-1', dto);
    });

    it('should throw BadRequestException when typeData is invalid for the business type', () => {
      const dto = {
        businessType: 'RESTAURANT' as any,
        name: 'Test Restaurant',
        city: 'Lisboa',
        typeData: { priceRange: 'INVALID' },
      };

      expect(() => service.create('user-id-1', dto)).toThrow(
        BadRequestException,
      );
      expect(repository.create).not.toHaveBeenCalled();
    });

    it('should create TOUR_GUIDE with itinerary containing photo objects', async () => {
      repository.create.mockResolvedValue(mockBusiness);

      const dto = {
        businessType: 'TOUR_GUIDE' as any,
        name: 'Lucas Turismo',
        city: 'Calheta',
        typeData: {
          languages: ['portugues', 'ingles'],
          meetingPoint: 'Aeroporto',
          countryOfOrigin: 'Portugal',
          featured: false,
          profileImage: 'https://example.com/profile.webp',
          itinerary: [
            {
              name: 'Lisboa',
              description: 'lisboa',
              photos: [
                {
                  url: 'https://example.com/photo1.jpg',
                  lat: 38.72,
                  lng: -9.41,
                },
                {
                  url: 'https://example.com/photo2.jpg',
                  lat: 38.7,
                  lng: -9.13,
                },
              ],
            },
          ],
        },
      };

      const result = await service.create('user-id-1', dto);

      expect(result).toEqual(mockBusiness);
      expect(repository.create).toHaveBeenCalledWith('user-id-1', dto);
    });

    it('should throw BadRequestException for TOUR_GUIDE with invalid photo URL', () => {
      const dto = {
        businessType: 'TOUR_GUIDE' as any,
        name: 'Lucas Turismo',
        city: 'Calheta',
        typeData: {
          itinerary: [
            {
              name: 'Lisboa',
              photos: [{ url: 'not-a-valid-url' }],
            },
          ],
        },
      };

      expect(() => service.create('user-id-1', dto)).toThrow(
        BadRequestException,
      );
      expect(repository.create).not.toHaveBeenCalled();
    });
  });

  // ── update ─────────────────────────────────────────────────

  describe('update (saves draft only)', () => {
    it('should save draft when user is owner', async () => {
      const updated = {
        ...mockBusiness,
        draftData: { name: 'Updated Restaurant' },
      };
      repository.findByIdAndUserId.mockResolvedValue(mockBusiness);
      repository.saveDraft.mockResolvedValue(updated);

      const dto = { name: 'Updated Restaurant' };
      const result = await service.update('business-id-1', 'user-id-1', dto);

      expect(result).toEqual(updated);
      expect(repository.findByIdAndUserId).toHaveBeenCalledWith(
        'business-id-1',
        'user-id-1',
      );
      expect(repository.saveDraft).toHaveBeenCalledWith('business-id-1', dto);
      expect(repository.update).not.toHaveBeenCalled();
    });

    it('should throw ForbiddenException when user is not owner (repository returns null)', async () => {
      repository.findByIdAndUserId.mockResolvedValue(null);

      await expect(
        service.update('business-id-1', 'other-user-id', { name: 'X' }),
      ).rejects.toThrow(ForbiddenException);
      expect(repository.saveDraft).not.toHaveBeenCalled();
    });

    it('should validate typeData when provided in update', async () => {
      repository.findByIdAndUserId.mockResolvedValue(mockBusiness);

      const dto = {
        typeData: { priceRange: 'INVALID' },
      };

      await expect(
        service.update('business-id-1', 'user-id-1', dto),
      ).rejects.toThrow(BadRequestException);
      expect(repository.saveDraft).not.toHaveBeenCalled();
    });

    it('should validate typeData against the new businessType (not the existing one)', async () => {
      repository.findByIdAndUserId.mockResolvedValue(mockBusiness); // existing is RESTAURANT

      const dto = {
        businessType: 'LEGAL' as any,
        typeData: { specializations: 12345 } as any,
      };

      await expect(
        service.update('business-id-1', 'user-id-1', dto),
      ).rejects.toThrow(BadRequestException);
      expect(repository.saveDraft).not.toHaveBeenCalled();
    });

    it('should save draft with valid typeData', async () => {
      const updatedBusiness = {
        ...mockBusiness,
        draftData: { typeData: { cuisine: 'Italiana' } },
      };
      repository.findByIdAndUserId.mockResolvedValue(mockBusiness);
      repository.saveDraft.mockResolvedValue(updatedBusiness);

      const result = await service.update('business-id-1', 'user-id-1', {
        typeData: { cuisine: 'Italiana' } as any,
      });

      expect(result).toEqual(updatedBusiness);
      expect(repository.saveDraft).toHaveBeenCalled();
    });
  });

  describe('publishDraft', () => {
    it('should apply draft and clear draftData', async () => {
      const draft = { name: 'Published Name' };
      const withDraft = { ...mockBusiness, draftData: draft };
      const published = {
        ...mockBusiness,
        name: 'Published Name',
        draftData: null,
      };
      repository.findByIdAndUserId.mockResolvedValue(withDraft);
      repository.applyDraftAndClearDraft.mockResolvedValue(published);

      const result = await service.publishDraft('business-id-1', 'user-id-1');

      expect(result).toEqual(published);
      expect(repository.applyDraftAndClearDraft).toHaveBeenCalledWith(
        'business-id-1',
        draft,
      );
    });

    it('should throw BadRequestException when no draft', async () => {
      repository.findByIdAndUserId.mockResolvedValue(mockBusiness);

      await expect(
        service.publishDraft('business-id-1', 'user-id-1'),
      ).rejects.toThrow(BadRequestException);
      expect(repository.applyDraftAndClearDraft).not.toHaveBeenCalled();
    });
  });

  describe('discardDraft', () => {
    it('should clear draft', async () => {
      const cleared = { ...mockBusiness, draftData: null };
      repository.findByIdAndUserId.mockResolvedValue({
        ...mockBusiness,
        draftData: { name: 'X' },
      });
      repository.clearDraft.mockResolvedValue(cleared);

      const result = await service.discardDraft('business-id-1', 'user-id-1');

      expect(result).toEqual(cleared);
      expect(repository.clearDraft).toHaveBeenCalledWith('business-id-1');
    });

    it('should throw BadRequestException when no draft', async () => {
      repository.findByIdAndUserId.mockResolvedValue(mockBusiness);

      await expect(
        service.discardDraft('business-id-1', 'user-id-1'),
      ).rejects.toThrow(BadRequestException);
      expect(repository.clearDraft).not.toHaveBeenCalled();
    });
  });

  // ── delete ─────────────────────────────────────────────────

  describe('delete', () => {
    it('should delete a business when user is owner', async () => {
      repository.findByIdAndUserId.mockResolvedValue(mockBusiness);
      repository.delete.mockResolvedValue(mockBusiness);

      const result = await service.delete('business-id-1', 'user-id-1');

      expect(result).toEqual(mockBusiness);
      expect(repository.delete).toHaveBeenCalledWith('business-id-1');
    });

    it('should throw ForbiddenException when user is not owner', async () => {
      repository.findByIdAndUserId.mockResolvedValue(null);

      await expect(
        service.delete('business-id-1', 'other-user-id'),
      ).rejects.toThrow(ForbiddenException);
      expect(repository.delete).not.toHaveBeenCalled();
    });
  });

  // ── toggleVisibility ───────────────────────────────────────

  describe('toggleVisibility', () => {
    it('should toggle visibility when user is owner', async () => {
      const updated = { ...mockBusiness, isPublic: true };
      repository.findByIdAndUserId.mockResolvedValue(mockBusiness);
      repository.toggleVisibility.mockResolvedValue(updated);

      const result = await service.toggleVisibility(
        'business-id-1',
        'user-id-1',
        true,
      );

      expect(result).toEqual(updated);
      expect(repository.toggleVisibility).toHaveBeenCalledWith(
        'business-id-1',
        true,
      );
    });

    it('should throw ForbiddenException when user is not owner', async () => {
      repository.findByIdAndUserId.mockResolvedValue(null);

      await expect(
        service.toggleVisibility('business-id-1', 'other-user-id', true),
      ).rejects.toThrow(ForbiddenException);
      expect(repository.toggleVisibility).not.toHaveBeenCalled();
    });
  });

  // ── getPublicBusinesses ────────────────────────────────────

  describe('getPublicBusinesses', () => {
    it('should return paginated public businesses', async () => {
      const paginatedResult = { data: [mockBusiness], total: 1 };
      repository.findPublic.mockResolvedValue(paginatedResult);

      const query = { page: 1, limit: 20 };
      const result = await service.getPublicBusinesses(query as any);

      expect(result).toEqual(paginatedResult);
      expect(repository.findPublic).toHaveBeenCalledWith(query);
    });
  });

  // ── getPublicBusinessById ──────────────────────────────────

  describe('getPublicBusinessById', () => {
    it('should return a public business by id', async () => {
      const publicBusiness = { ...mockBusiness, isPublic: true };
      repository.findPublicById.mockResolvedValue(publicBusiness);

      const result = await service.getPublicBusinessById('business-id-1');

      expect(result).toEqual(publicBusiness);
      expect(repository.findPublicById).toHaveBeenCalledWith('business-id-1');
    });

    it('should throw NotFoundException when business not found (repository returns null)', async () => {
      repository.findPublicById.mockResolvedValue(null);

      await expect(
        service.getPublicBusinessById('non-existent'),
      ).rejects.toThrow(NotFoundException);
    });
  });
});
