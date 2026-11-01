jest.mock('@app/database', () => ({
  PrismaService: jest.fn(),
  DatabaseModule: jest.fn(),
}));

jest.mock('../../../../generated/prisma', () => ({
  CityIngestionStatus: { PROCESSING: 'PROCESSING' },
  CityIngestionScope: { CITY: 'CITY', COUNTRY: 'COUNTRY' },
  PlaceReviewStatus: {
    DRAFT: 'DRAFT',
    APPROVED: 'APPROVED',
    REJECTED: 'REJECTED',
  },
  PlaceCategory: { LANDMARK: 'LANDMARK', MUSEUM: 'MUSEUM' },
}));

import { ConflictException, NotFoundException } from '@nestjs/common';
import { PlacesAdminRepository } from './places-admin.repository';
import { PlacesAdminService } from './places-admin.service';
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
  let placesAdminService: Record<string, jest.Mock>;
  let service: PlacesCatalogAdminService;

  beforeEach(() => {
    repository = {
      listCatalog: jest.fn().mockResolvedValue({ data: [place()], total: 1 }),
      findCatalogPlace: jest.fn().mockResolvedValue(place()),
      updateCatalogPlace: jest.fn().mockResolvedValue(place()),
      setPlaceActive: jest.fn().mockResolvedValue(place({ isActive: false })),
      deletePlace: jest.fn().mockResolvedValue(undefined),
      deletePlaces: jest.fn().mockResolvedValue(2),
      deleteCityPlaces: jest
        .fn()
        .mockResolvedValue({ deleted: 5, keptRejected: 1 }),
      findLatestCityIngestion: jest.fn().mockResolvedValue(null),
      findActiveOverlapping: jest.fn().mockResolvedValue(null),
    };
    placesAdminService = {
      createIngestion: jest.fn().mockResolvedValue({ id: 'ing-new' }),
    };
    service = new PlacesCatalogAdminService(
      repository as unknown as PlacesAdminRepository,
      placesAdminService as unknown as PlacesAdminService,
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

  describe('removeMany', () => {
    it('returns how many places the repository actually deleted', async () => {
      await expect(service.removeMany(['a', 'b', 'gone'])).resolves.toBe(2);
      expect(repository.deletePlaces).toHaveBeenCalledWith(['a', 'b', 'gone']);
    });
  });

  describe('resetCity', () => {
    const dto = { countryCode: 'PT', city: 'Lisbon' };

    it('only deletes when reingest is off, handing the city and state through', async () => {
      const withState = { ...dto, state: 'Lisboa' };

      await expect(service.resetCity(withState, 'admin-1')).resolves.toEqual({
        deleted: 5,
        keptRejected: 1,
        ingestion: null,
      });
      await service.resetCity(dto, 'admin-1');

      expect(repository.deleteCityPlaces).toHaveBeenNthCalledWith(1, withState);
      expect(repository.deleteCityPlaces).toHaveBeenNthCalledWith(2, dto);
      expect(repository.findLatestCityIngestion).not.toHaveBeenCalled();
      expect(placesAdminService.createIngestion).not.toHaveBeenCalled();
    });

    it('answers zeros, not 404, when nothing matched', async () => {
      repository.deleteCityPlaces.mockResolvedValue({
        deleted: 0,
        keptRejected: 0,
      });

      await expect(service.resetCity(dto, 'admin-1')).resolves.toEqual({
        deleted: 0,
        keptRejected: 0,
        ingestion: null,
      });
    });

    it('reuses the spelling, categories and OSM area of the latest ingestion', async () => {
      repository.findLatestCityIngestion.mockResolvedValue({
        city: 'Lisboa',
        state: 'Lisboa District',
        categories: ['MUSEUM'],
        osmAreaId: 3600000001,
      });

      const result = await service.resetCity(
        { ...dto, reingest: true },
        'admin-1',
      );

      const input = {
        countryCode: 'PT',
        scope: 'CITY',
        city: 'Lisboa',
        state: 'Lisboa District',
        categories: ['MUSEUM'],
        osmAreaId: 3600000001,
      };
      expect(repository.findActiveOverlapping).toHaveBeenCalledWith({
        countryCode: 'PT',
        scope: 'CITY',
        city: 'Lisboa',
        state: 'Lisboa District',
        categories: ['MUSEUM'],
      });
      expect(placesAdminService.createIngestion).toHaveBeenCalledWith(
        input,
        'admin-1',
      );
      expect(result.ingestion).toEqual({ id: 'ing-new' });
      expect(result.deleted).toBe(5);
    });

    it('falls back to the request when the city was never ingested', async () => {
      await service.resetCity({ ...dto, reingest: true }, 'admin-1');

      expect(placesAdminService.createIngestion).toHaveBeenCalledWith(
        {
          countryCode: 'PT',
          scope: 'CITY',
          city: 'Lisbon',
          state: undefined,
          categories: [],
          osmAreaId: undefined,
        },
        'admin-1',
      );
    });

    it('answers 409 and deletes nothing when an ingestion is already in flight', async () => {
      repository.findActiveOverlapping.mockResolvedValue({
        id: 'ing-1',
        status: 'PROCESSING',
      });

      await expect(
        service.resetCity({ ...dto, reingest: true }, 'admin-1'),
      ).rejects.toThrow(ConflictException);

      expect(repository.deleteCityPlaces).not.toHaveBeenCalled();
      expect(placesAdminService.createIngestion).not.toHaveBeenCalled();
    });
  });
});
