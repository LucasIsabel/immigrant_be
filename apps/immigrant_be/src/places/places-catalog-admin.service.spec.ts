jest.mock('@app/database', () => ({
  PrismaService: jest.fn(),
  DatabaseModule: jest.fn(),
}));

jest.mock('../../../../generated/prisma', () => ({
  CityIngestionStatus: { PROCESSING: 'PROCESSING' },
  PlaceReviewStatus: {
    DRAFT: 'DRAFT',
    APPROVED: 'APPROVED',
    REJECTED: 'REJECTED',
  },
  PlaceCategory: { LANDMARK: 'LANDMARK', MUSEUM: 'MUSEUM' },
}));

import { NotFoundException } from '@nestjs/common';
import { PlacesAdminRepository } from './places-admin.repository';
import { PlacesCatalogAdminService } from './places-catalog-admin.service';

const PLACE_ID = '22222222-2222-4222-8222-222222222222';

const place = (over: Record<string, unknown> = {}) => ({
  id: PLACE_ID,
  name: 'Torre de Belém',
  countryCode: 'PT',
  city: 'Lisbon',
  imageUrl: null,
  slug: 'torre-de-belem',
  category: 'LANDMARK',
  reviewStatus: 'APPROVED',
  isActive: true,
  lat: 38.69,
  lng: -9.21,
  isFree: false,
  popularityScore: 100,
  address: null,
  website: null,
  sourceUrl: null,
  wikidataId: null,
  wikipediaMonthlyViews: null,
  generatedByModel: null,
  generationCostUsd: null,
  translations: [],
  ...over,
});

describe('PlacesCatalogAdminService', () => {
  let repository: Record<string, jest.Mock>;
  let service: PlacesCatalogAdminService;

  beforeEach(() => {
    repository = {
      listCatalog: jest.fn().mockResolvedValue({ data: [place()], total: 1 }),
      findCatalogPlace: jest.fn().mockResolvedValue(place()),
      updateCatalogPlace: jest.fn().mockResolvedValue(place()),
      setPlaceActive: jest.fn().mockResolvedValue(place({ isActive: false })),
      deletePlace: jest.fn().mockResolvedValue(undefined),
    };
    service = new PlacesCatalogAdminService(
      repository as unknown as PlacesAdminRepository,
    );
  });

  describe('list', () => {
    it('turns the isActive query string into a boolean, and omission into both', async () => {
      // 'false' is a truthy string: forwarding it raw would filter for active.
      await service.list({ isActive: 'false' });
      await service.list({});

      expect(repository.listCatalog).toHaveBeenNthCalledWith(
        1,
        expect.objectContaining({ isActive: false }),
      );
      expect(repository.listCatalog).toHaveBeenNthCalledWith(
        2,
        expect.objectContaining({ isActive: undefined }),
      );
    });

    it('uppercases the country code so a lowercase filter still matches', async () => {
      await service.list({ countryCode: 'pt' });

      expect(repository.listCatalog).toHaveBeenCalledWith(
        expect.objectContaining({ countryCode: 'PT' }),
      );
    });
  });

  describe('update', () => {
    it('edits an APPROVED place — the whole reason this flow exists', async () => {
      // The ingestion PATCH answers 409 for anything past DRAFT. The catalogue
      // is the flow that may touch production.
      const result = await service.update(PLACE_ID, {
        name: 'Torre de Belém (Belém Tower)',
        translations: [{ language: 'en', description: 'A 16th century tower' }],
      });

      expect(repository.updateCatalogPlace).toHaveBeenCalledWith(
        PLACE_ID,
        { name: 'Torre de Belém (Belém Tower)' },
        [{ language: 'en', description: 'A 16th century tower' }],
      );
      expect(result.id).toBe(PLACE_ID);
    });

    it('404s for a place that does not exist', async () => {
      repository.findCatalogPlace.mockResolvedValue(null);

      await expect(service.update(PLACE_ID, {})).rejects.toThrow(
        NotFoundException,
      );
      expect(repository.updateCatalogPlace).not.toHaveBeenCalled();
    });
  });

  describe('setActive', () => {
    it('deactivates without deleting — data stays recoverable', async () => {
      const result = await service.setActive(PLACE_ID, false);

      expect(repository.setPlaceActive).toHaveBeenCalledWith(PLACE_ID, false);
      expect(repository.deletePlace).not.toHaveBeenCalled();
      expect(result.isActive).toBe(false);
    });
  });

  describe('remove', () => {
    it('hard deletes only after confirming the place exists', async () => {
      await service.remove(PLACE_ID);
      expect(repository.deletePlace).toHaveBeenCalledWith(PLACE_ID);
    });
  });
});
