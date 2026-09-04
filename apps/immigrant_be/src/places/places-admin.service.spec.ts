jest.mock('@app/database', () => ({
  PrismaService: jest.fn(),
  DatabaseModule: jest.fn(),
}));

jest.mock('../../../../generated/prisma', () => ({
  CityIngestionStatus: {
    PROCESSING: 'PROCESSING',
    FAILED: 'FAILED',
    READY_FOR_REVIEW: 'READY_FOR_REVIEW',
    APPROVED: 'APPROVED',
    REJECTED: 'REJECTED',
  },
  PlaceReviewStatus: {
    DRAFT: 'DRAFT',
    APPROVED: 'APPROVED',
    REJECTED: 'REJECTED',
  },
  PlaceCategory: { LANDMARK: 'LANDMARK' },
}));

import {
  ConflictException,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import type { IngestionDispatcher } from '@app/ingestion';
import { PlacesAdminRepository } from './places-admin.repository';
import { PlacesAdminService } from './places-admin.service';

const ADMIN_ID = 'admin-1';
const INGESTION_ID = '11111111-1111-4111-8111-111111111111';
const PLACE_ID = '22222222-2222-4222-8222-222222222222';

const ingestion = (over: Record<string, unknown> = {}) => ({
  id: INGESTION_ID,
  countryCode: 'PT',
  city: 'Lisbon',
  status: 'READY_FOR_REVIEW',
  step: null,
  errorMessage: null,
  osmAreaId: null,
  osmMatchedName: null,
  stats: null,
  createdAt: new Date('2026-08-25T12:00:00Z'),
  updatedAt: new Date('2026-08-25T12:00:00Z'),
  ...over,
});

const place = (over: Record<string, unknown> = {}) => ({
  id: PLACE_ID,
  name: 'Torre de Belém',
  slug: 'torre-de-belem',
  category: 'LANDMARK',
  reviewStatus: 'DRAFT',
  isActive: false,
  lat: 38.69,
  lng: -9.21,
  isFree: false,
  popularityScore: 100,
  address: null,
  website: null,
  sourceUrl: 'https://www.openstreetmap.org/way/1',
  wikidataId: 'Q215003',
  wikipediaMonthlyViews: 12997,
  generatedByModel: 'gemini-flash',
  generationCostUsd: { toNumber: () => 0.0002 },
  translations: [],
  ...over,
});

describe('PlacesAdminService', () => {
  // A structural type rather than `jest.Mocked<PlacesAdminRepository>`: ESLint
  // reads a class method inside an `expect` as an unbound reference.
  let repository: Record<string, jest.Mock>;
  let dispatcher: {
    dispatchCity: jest.Mock;
    dispatchPlaceTexts: jest.Mock;
    dispatchPlaceImages: jest.Mock;
  };
  let service: PlacesAdminService;

  beforeEach(() => {
    repository = {
      findActiveForCity: jest.fn().mockResolvedValue(null),
      create: jest.fn().mockImplementation(() => Promise.resolve(ingestion())),
      list: jest.fn(),
      findById: jest.fn().mockResolvedValue(ingestion()),
      findDetail: jest.fn(),
      findPlaceInIngestion: jest.fn().mockResolvedValue(place()),
      updatePlace: jest.fn().mockResolvedValue(place()),
      rejectPlace: jest
        .fn()
        .mockResolvedValue(place({ reviewStatus: 'REJECTED' })),
      recordPlaceRejection: jest.fn().mockResolvedValue(1),
      findDraftsMissingTexts: jest.fn().mockResolvedValue([]),
      approve: jest.fn().mockResolvedValue({
        ingestion: ingestion({ status: 'APPROVED' }),
        published: 10,
      }),
      reject: jest.fn().mockResolvedValue(ingestion({ status: 'REJECTED' })),
      reopen: jest.fn().mockResolvedValue(ingestion({ status: 'PROCESSING' })),
    };

    dispatcher = {
      dispatchCity: jest.fn().mockResolvedValue(undefined),
      dispatchPlaceTexts: jest.fn().mockResolvedValue(undefined),
      dispatchPlaceImages: jest.fn().mockResolvedValue(undefined),
    };

    service = new PlacesAdminService(
      repository as unknown as PlacesAdminRepository,
      dispatcher as IngestionDispatcher,
    );
  });

  describe('listIngestions', () => {
    beforeEach(() => {
      repository.list.mockResolvedValue({ data: [], total: 0 });
    });

    it('upper-cases the country before it reaches the query', async () => {
      // The ISO2 is stored upper-cased. A `pt` that fails to match `PT` would
      // hand back an empty list with nothing to explain why.
      await service.listIngestions({ countryCode: 'pt' });

      expect(repository.list).toHaveBeenCalledWith(
        expect.objectContaining({ countryCode: 'PT' }),
      );
    });

    it('passes the city through as it was chosen', async () => {
      await service.listIngestions({ city: 'Lisbon' });

      expect(repository.list).toHaveBeenCalledWith(
        expect.objectContaining({ city: 'Lisbon' }),
      );
    });

    it('asks for no country and no city when neither was given', async () => {
      // `undefined` and not an empty string: the repository builds its `where`
      // by presence, and a `''` would become a filter matching nothing.
      await service.listIngestions({});

      expect(repository.list).toHaveBeenCalledWith({
        status: undefined,
        countryCode: undefined,
        city: undefined,
        page: 1,
        limit: 20,
      });
    });
  });

  describe('createIngestion', () => {
    it('creates the ingestion and queues the city', async () => {
      await service.createIngestion(
        { countryCode: 'PT', city: 'Lisbon' },
        ADMIN_ID,
      );

      expect(dispatcher.dispatchCity).toHaveBeenCalledWith(INGESTION_ID);
    });

    it('refuses a second in-flight ingestion of the same city', async () => {
      // Two at once would compete for the same slugs.
      repository.findActiveForCity.mockResolvedValue({
        id: 'outra',
        status: 'PROCESSING',
      } as never);

      await expect(
        service.createIngestion(
          { countryCode: 'PT', city: 'Lisbon' },
          ADMIN_ID,
        ),
      ).rejects.toThrow(ConflictException);
      expect(dispatcher.dispatchCity).not.toHaveBeenCalled();
    });

    it('returns osmAreaId as a string, because BigInt does not serialise', async () => {
      // Without the conversion the route would 500 on the first resolved city.
      repository.create.mockResolvedValue(
        ingestion({ osmAreaId: BigInt(3605400890) }) as never,
      );

      const result = await service.createIngestion(
        { countryCode: 'PT', city: 'Lisbon' },
        ADMIN_ID,
      );

      expect(result.osmAreaId).toBe('3605400890');
      expect(() => JSON.stringify(result)).not.toThrow();
    });
  });

  describe('approve', () => {
    it('publishes the drafts once every one has all three translations', async () => {
      const result = await service.approve(INGESTION_ID, ADMIN_ID);

      expect(repository.approve).toHaveBeenCalledWith(INGESTION_ID, ADMIN_ID);
      expect(result.status).toBe('APPROVED');
    });

    it('refuses with 422 and lists whoever lacks a translation', async () => {
      // Approving silently would publish a card that is mute in Spanish.
      repository.findDraftsMissingTexts.mockResolvedValue([
        { id: PLACE_ID, name: 'Torre de Belém', slug: 'torre-de-belem' },
      ]);

      await expect(service.approve(INGESTION_ID, ADMIN_ID)).rejects.toThrow(
        UnprocessableEntityException,
      );
      expect(repository.approve).not.toHaveBeenCalled();
    });

    it('only decides a city that is ready for review', async () => {
      repository.findById.mockResolvedValue(
        ingestion({ status: 'PROCESSING' }) as never,
      );

      await expect(service.approve(INGESTION_ID, ADMIN_ID)).rejects.toThrow(
        ConflictException,
      );
    });
  });

  describe('updatePlace', () => {
    it('does not edit a place that has left draft', async () => {
      // Editing a published place here would touch production with no trail.
      repository.findPlaceInIngestion.mockResolvedValue(
        place({ reviewStatus: 'APPROVED' }) as never,
      );

      await expect(
        service.updatePlace(INGESTION_ID, PLACE_ID, { name: 'Outro' }),
      ).rejects.toThrow(ConflictException);
    });

    it('404s when the place does not belong to this ingestion', async () => {
      repository.findPlaceInIngestion.mockResolvedValue(null as never);

      await expect(
        service.updatePlace(INGESTION_ID, PLACE_ID, { name: 'Outro' }),
      ).rejects.toThrow(NotFoundException);
    });

    it('converts the cost Decimal into a number', async () => {
      const result = await service.updatePlace(INGESTION_ID, PLACE_ID, {});

      expect(result.generationCostUsd).toBe(0.0002);
    });

    /*
     * The place whose text writing failed is the one that most needs editing,
     * and it was the only one the screen could not edit: the repository ran
     * `update` on a translation row that did not exist and the request became
     * a 500. Sentry IMMIGRANT-BE-3, on the Larnaca ingestion.
     */
    it('writes the texts of a place that has none', async () => {
      // The fixture already carries `translations: []`, which is the state
      // that produced the failure in production.
      await expect(
        service.updatePlace(INGESTION_ID, PLACE_ID, {
          translations: [
            {
              language: 'pt',
              description: 'Uma descrição com mais de vinte caracteres.',
            },
          ],
        }),
      ).resolves.toBeDefined();

      expect(repository.updatePlace).toHaveBeenCalled();
    });

    it('refuses to create a translation without a description, and says which', async () => {
      await expect(
        service.updatePlace(INGESTION_ID, PLACE_ID, {
          translations: [{ language: 'en', tip: 'Go early.' }],
        }),
      ).rejects.toThrow(UnprocessableEntityException);

      // The point is the admin reading which language is missing instead of
      // `Internal server error`.
      await expect(
        service.updatePlace(INGESTION_ID, PLACE_ID, {
          translations: [{ language: 'en', tip: 'Go early.' }],
        }),
      ).rejects.toThrow(/en/);

      expect(repository.updatePlace).not.toHaveBeenCalled();
    });

    it('lets a language the place already has be edited on its own', async () => {
      repository.findPlaceInIngestion.mockResolvedValue(
        place({
          translations: [
            { language: 'pt', description: 'Já existe.', tip: null },
          ],
        }) as never,
      );

      await expect(
        service.updatePlace(INGESTION_ID, PLACE_ID, {
          translations: [{ language: 'pt', tip: 'Vá cedo.' }],
        }),
      ).resolves.toBeDefined();
    });
  });

  describe('rejectPlace', () => {
    it('keeps the reason instead of discarding it', async () => {
      await service.rejectPlace(
        INGESTION_ID,
        PLACE_ID,
        'It is a residential neighbourhood',
      );

      expect(repository.recordPlaceRejection).toHaveBeenCalledWith(
        INGESTION_ID,
        PLACE_ID,
        'It is a residential neighbourhood',
      );
    });

    it('accepts a rejection with no reason', async () => {
      await service.rejectPlace(INGESTION_ID, PLACE_ID);

      expect(repository.recordPlaceRejection).not.toHaveBeenCalled();
      expect(repository.rejectPlace).toHaveBeenCalledWith(PLACE_ID);
    });
  });

  describe('retry', () => {
    it('re-queues without discarding the area already resolved', async () => {
      repository.findById.mockResolvedValue(
        ingestion({ status: 'FAILED', osmAreaId: BigInt(3605400893) }) as never,
      );

      await service.retry(INGESTION_ID);

      expect(repository.reopen).toHaveBeenCalledWith(INGESTION_ID);
      expect(dispatcher.dispatchCity).toHaveBeenCalledWith(INGESTION_ID);
    });

    it('only reprocesses an ingestion in FAILED', async () => {
      await expect(service.retry(INGESTION_ID)).rejects.toThrow(
        ConflictException,
      );
      expect(dispatcher.dispatchCity).not.toHaveBeenCalled();
    });
  });
});
