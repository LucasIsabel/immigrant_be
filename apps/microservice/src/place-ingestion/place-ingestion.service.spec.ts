jest.mock('@app/config/env', () => ({
  env: {
    OVERPASS_BASE_URL: 'https://overpass.test/api/interpreter',
    INGESTION_USER_AGENT: 'aloravia-test/1.0',
  },
}));

jest.mock('@app/database', () => ({
  PrismaService: jest.fn(),
  DatabaseModule: jest.fn(),
}));

jest.mock('../../../../generated/prisma', () => ({
  PlaceCategory: { LANDMARK: 'LANDMARK', MUSEUM: 'MUSEUM' },
  CityIngestionStatus: {
    PROCESSING: 'PROCESSING',
    READY_FOR_REVIEW: 'READY_FOR_REVIEW',
    FAILED: 'FAILED',
  },
}));

import { AiRouterService } from '@app/ai';
import type { IngestionDispatcher } from '@app/ingestion';
import type { OverpassPoi, OverpassService } from './overpass.service';
import { PlaceIngestionRepository } from './place-ingestion.repository';
import { PlaceIngestionService } from './place-ingestion.service';
import type { WikimediaService } from './wikimedia.service';

const INGESTION_ID = 'ingestion-1';

const poi = (
  name: string,
  qid: string,
  over: Partial<OverpassPoi> = {},
): OverpassPoi => ({
  osmType: 'way',
  osmId: 10,
  name,
  wikidataId: qid,
  lat: 38.6,
  lng: -9.2,
  category: 'LANDMARK' as OverpassPoi['category'],
  isFree: false,
  ...over,
});

/** Popularity signal for a QID, so ranking order is controllable in a test. */
const signal = (qid: string, monthlyViews: number) => ({
  wikidataId: qid,
  title: qid,
  monthlyViews,
  extract: null,
});

/**
 * A repository that behaves like the database rather than like a mock.
 *
 * The convergence test is about a race, so a `jest.fn()` returning a canned
 * value would prove nothing: what matters is that the second caller sees the
 * state the first one left. This fake keeps the status and applies the same
 * compare-and-set the SQL does.
 */
class FakeRepository {
  status = 'PROCESSING';
  placesWithoutTexts = new Set<string>();
  failures: string[] = [];
  savedStats: unknown;

  findIngestion = jest.fn().mockResolvedValue({
    id: INGESTION_ID,
    countryCode: 'PT',
    city: 'Lisbon',
    osmAreaId: BigInt(3600058691),
  });

  findPlace = jest.fn().mockImplementation((id: string) =>
    Promise.resolve({
      id,
      name: 'Torre de Belém',
      category: 'LANDMARK',
      city: 'Lisbon',
      countryCode: 'PT',
      isFree: false,
      wikidataId: 'Q1',
      wikipediaMonthlyViews: 13000,
    }),
  );

  markStep = jest.fn().mockResolvedValue(undefined);
  markFailed = jest.fn().mockResolvedValue(undefined);
  saveResolvedArea = jest.fn().mockResolvedValue(undefined);
  findCountryIdByName = jest.fn().mockResolvedValue({ id: 'country-1' });

  saveStats = jest.fn().mockImplementation((_id: string, stats: unknown) => {
    this.savedStats = stats;
    return Promise.resolve();
  });

  persistDrafts = jest.fn().mockImplementation(() => {
    for (const id of ['place-1', 'place-2', 'place-3']) {
      this.placesWithoutTexts.add(id);
    }
    return Promise.resolve({
      createdIds: ['place-1', 'place-2', 'place-3'],
      conflicts: [],
    });
  });

  saveTexts = jest.fn().mockImplementation((placeId: string) => {
    this.placesWithoutTexts.delete(placeId);
    return Promise.resolve();
  });

  recordTextFailure = jest.fn().mockImplementation((_id: string, placeId) => {
    this.failures.push(placeId as string);
    this.placesWithoutTexts.delete(placeId as string);
    return Promise.resolve();
  });

  countPendingTexts = jest
    .fn()
    .mockImplementation(() => Promise.resolve(this.placesWithoutTexts.size));

  markReadyIfDone = jest.fn().mockImplementation(() => {
    if (this.status !== 'PROCESSING') return Promise.resolve(false);
    this.status = 'READY_FOR_REVIEW';
    return Promise.resolve(true);
  });
}

describe('PlaceIngestionService', () => {
  let repository: FakeRepository;
  let dispatcher: { dispatchCity: jest.Mock; dispatchPlaceTexts: jest.Mock };
  let overpass: {
    resolveArea: jest.Mock;
    areaName: jest.Mock;
    fetchPois: jest.Mock;
  };
  let wikimedia: { popularity: jest.Mock };
  let aiRouter: { generateJson: jest.Mock };
  let service: PlaceIngestionService;

  beforeEach(() => {
    repository = new FakeRepository();
    dispatcher = {
      dispatchCity: jest.fn().mockResolvedValue(undefined),
      dispatchPlaceTexts: jest.fn().mockResolvedValue(undefined),
    };
    overpass = {
      resolveArea: jest.fn(),
      areaName: jest.fn(),
      fetchPois: jest
        .fn()
        .mockResolvedValue([poi('Torre de Belém', 'Q1'), poi('Sé', 'Q2')]),
    };
    wikimedia = {
      popularity: jest.fn().mockResolvedValue([
        {
          wikidataId: 'Q1',
          title: 'Belém Tower',
          monthlyViews: 13000,
          extract: 'A tower.',
        },
        {
          wikidataId: 'Q2',
          title: 'Lisbon Cathedral',
          monthlyViews: 4000,
          extract: null,
        },
      ]),
    };
    aiRouter = {
      generateJson: jest.fn().mockResolvedValue({
        data: {
          pt: { description: 'a'.repeat(100), tip: null },
          en: { description: 'b'.repeat(100), tip: 'Go early.' },
          es: { description: 'c'.repeat(100), tip: null },
        },
        result: { model: 'gemini-flash', usage: { costUsd: 0.0002 } },
      }),
    };

    service = new PlaceIngestionService(
      repository as unknown as PlaceIngestionRepository,
      overpass as unknown as OverpassService,
      wikimedia as unknown as WikimediaService,
      aiRouter as unknown as AiRouterService,
      dispatcher as IngestionDispatcher,
    );
  });

  describe('ingestCity', () => {
    it('fans out one text job per place it created', async () => {
      await service.ingestCity(INGESTION_ID);

      expect(dispatcher.dispatchPlaceTexts).toHaveBeenCalledTimes(1);
      expect(dispatcher.dispatchPlaceTexts).toHaveBeenCalledWith([
        { placeId: 'place-1', ingestionId: INGESTION_ID },
        { placeId: 'place-2', ingestionId: INGESTION_ID },
        { placeId: 'place-3', ingestionId: INGESTION_ID },
      ]);
    });

    it('keeps the resolved area even when its name lookup fails', async () => {
      // Resolving costs up to four queries plus a probe; losing that because a
      // screen label took a 504 made the retry redo everything.
      repository.findIngestion.mockResolvedValue({
        id: INGESTION_ID,
        countryCode: 'PT',
        city: 'Sintra',
        osmAreaId: null,
      });
      overpass.resolveArea.mockResolvedValue(3605400893);
      overpass.areaName.mockRejectedValue(new Error('Overpass respondeu 504'));

      await service.ingestCity(INGESTION_ID);

      expect(repository.saveResolvedArea).toHaveBeenCalledWith(
        INGESTION_ID,
        3605400893,
        null,
      );
    });

    it('reuses the cached area instead of asking OpenStreetMap again', async () => {
      await service.ingestCity(INGESTION_ID);

      expect(overpass.resolveArea).not.toHaveBeenCalled();
      expect(overpass.fetchPois).toHaveBeenCalledWith(3600058691);
    });

    it('finishes the ingestion when every place was already curated', async () => {
      repository.persistDrafts.mockResolvedValue({
        createdIds: [],
        conflicts: [
          {
            slug: 'torre-de-belem',
            wikidataId: 'Q1',
            rank: 1,
            monthlyViews: 13000,
          },
        ],
      });

      await service.ingestCity(INGESTION_ID);

      expect(dispatcher.dispatchPlaceTexts).not.toHaveBeenCalled();
      expect(repository.status).toBe('READY_FOR_REVIEW');
    });
  });

  describe('ranking', () => {
    /** Persisted places, whatever the fake repository was told to create. */
    const persisted = () =>
      repository.persistDrafts.mock.calls[0][4] as {
        slug: string;
        wikidataId: string;
        popularityScore: number;
        osmType: string;
      }[];

    it('keeps one place per Wikidata id, preferring the relation over the node', async () => {
      // Measured in Porto: "Ribeira" exists as a node and as a relation. Same
      // place, drawn twice — and a relation's centre beats a hand-placed node.
      overpass.fetchPois.mockResolvedValue([
        poi('Ribeira', 'Q1', { osmType: 'node', osmId: 1 }),
        poi('Ribeira', 'Q1', { osmType: 'relation', osmId: 2 }),
      ]);
      wikimedia.popularity.mockResolvedValue([signal('Q1', 5000)]);

      await service.ingestCity(INGESTION_ID);

      expect(persisted()).toHaveLength(1);
      expect(persisted()[0].osmType).toBe('relation');
    });

    it('gives two different places sharing a name distinct slugs', async () => {
      // "Forte de São João Baptista" is two different forts in Porto. Colliding
      // on [countryCode, city, slug] would make the second upsert overwrite the
      // first, losing a place while still reporting both as created.
      overpass.fetchPois.mockResolvedValue([
        poi('Forte de São João Baptista', 'Q10283826'),
        poi('Forte de São João Baptista', 'Q10284015', { osmId: 11 }),
      ]);
      wikimedia.popularity.mockResolvedValue([
        signal('Q10283826', 900),
        signal('Q10284015', 500),
      ]);

      await service.ingestCity(INGESTION_ID);

      const slugs = persisted().map((place) => place.slug);
      expect(new Set(slugs).size).toBe(2);
      // The most visited keeps the readable slug.
      expect(slugs[0]).toBe('forte-de-sao-joao-baptista');
      expect(slugs[1]).toBe('forte-de-sao-joao-baptista-q10284015');
    });

    it('scores from 100 down to 1 whatever the number kept', async () => {
      // The old formula was welded to a cut of ten: at forty places the
      // fortieth would have scored -290, ordering backwards and failing the
      // admin PATCH validation.
      const many = Array.from({ length: 40 }, (_, i) =>
        poi(`Place ${i}`, `Q${i}`, { osmId: i }),
      );
      overpass.fetchPois.mockResolvedValue(many);
      wikimedia.popularity.mockResolvedValue(
        many.map((place, i) => signal(place.wikidataId, 10_000 - i)),
      );

      await service.ingestCity(INGESTION_ID);

      const scores = persisted().map((place) => place.popularityScore);
      expect(scores).toHaveLength(40);
      expect(scores[0]).toBe(100);
      expect(scores.at(-1)).toBe(3);
      expect(Math.min(...scores)).toBeGreaterThan(0);
      expect([...scores].sort((a, b) => b - a)).toEqual(scores);
    });

    it('reproduces the original scale when ten places are kept', async () => {
      const ten = Array.from({ length: 10 }, (_, i) =>
        poi(`Place ${i}`, `Q${i}`, { osmId: i }),
      );
      overpass.fetchPois.mockResolvedValue(ten);
      wikimedia.popularity.mockResolvedValue(
        ten.map((place, i) => signal(place.wikidataId, 10_000 - i)),
      );

      await service.ingestCity(INGESTION_ID);

      expect(persisted().map((place) => place.popularityScore)).toEqual([
        100, 90, 80, 70, 60, 50, 40, 30, 20, 10,
      ]);
    });
  });

  describe('convergence', () => {
    it('lets exactly one finishing job declare the city ready', async () => {
      await service.ingestCity(INGESTION_ID);

      const outcomes: boolean[] = [];
      for (const placeId of ['place-1', 'place-2', 'place-3']) {
        outcomes.push(
          (await service.writePlaceTexts(placeId, INGESTION_ID))
            .ingestionBecameReady,
        );
      }

      expect(outcomes).toEqual([false, false, true]);
      expect(repository.status).toBe('READY_FOR_REVIEW');
    });

    it('does not declare the city ready twice when a job is replayed', async () => {
      await service.ingestCity(INGESTION_ID);
      for (const placeId of ['place-1', 'place-2', 'place-3']) {
        await service.writePlaceTexts(placeId, INGESTION_ID);
      }

      const replay = await service.writePlaceTexts('place-3', INGESTION_ID);

      expect(replay.ingestionBecameReady).toBe(false);
    });

    it('a text that failed for good still lets the city finish', async () => {
      await service.ingestCity(INGESTION_ID);
      await service.writePlaceTexts('place-1', INGESTION_ID);
      await service.writePlaceTexts('place-2', INGESTION_ID);

      // place-3 never got its description. The other two must not be trapped
      // behind it.
      const becameReady = await service.abandonPlaceTexts(
        INGESTION_ID,
        'place-3',
      );

      expect(becameReady).toBe(true);
      expect(repository.failures).toEqual(['place-3']);
    });
  });
});
