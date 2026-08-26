jest.mock('@app/config/env', () => ({
  env: { INGESTION_USER_AGENT: 'aloravia-test/1.0' },
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
import { StorageService } from '@app/storage';
import type { IngestionDispatcher } from '@app/ingestion';
import {
  PermanentIngestionError,
  RetryableIngestionError,
} from '@app/ingestion';
import { PlaceIngestionRepository } from './place-ingestion.repository';
import { PlaceIngestionService } from './place-ingestion.service';
import {
  CityNotResolvedError,
  type DiscoveredPlace,
  type WikidataDiscoveryService,
} from './wikidata-discovery.service';
import type { WikimediaService } from './wikimedia.service';

const INGESTION_ID = 'ingestion-1';

const poi = (
  name: string,
  qid: string,
  over: Partial<DiscoveredPlace> = {},
): DiscoveredPlace => ({
  name,
  wikidataId: qid,
  articleTitle: name,
  lat: 38.6,
  lng: -9.2,
  category: 'LANDMARK' as DiscoveredPlace['category'],
  ...over,
});

/** What discovery hands the pipeline for a given candidate list. */
const discovered = (places: DiscoveredPlace[], droppedAsUnmapped = 0) => ({
  places,
  rawCount: places.length + droppedAsUnmapped,
  droppedAsUnmapped,
});

/** Popularity signal for a QID, so ranking order is controllable in a test. */
const signal = (
  qid: string,
  monthlyViews: number,
  commonsFile: string | null = null,
) => ({
  wikidataId: qid,
  title: qid,
  monthlyViews,
  extract: null,
  commonsFile,
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
  });

  savePlaceImage = jest.fn().mockResolvedValue(undefined);

  findPlace = jest.fn().mockImplementation((id: string) =>
    Promise.resolve({
      id,
      slug: 'torre-de-belem',
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
      created: [
        { id: 'place-1', slug: 'place-0' },
        { id: 'place-2', slug: 'place-1' },
        { id: 'place-3', slug: 'place-2' },
      ],
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
  let dispatcher: {
    dispatchCity: jest.Mock;
    dispatchPlaceTexts: jest.Mock;
    dispatchPlaceImages: jest.Mock;
  };
  let discovery: { resolveCity: jest.Mock; discover: jest.Mock };
  let wikimedia: {
    popularity: jest.Mock;
    imageInfo: jest.Mock;
    download: jest.Mock;
  };
  let aiRouter: { generateJson: jest.Mock };
  let storage: { uploadFileAtKey: jest.Mock };
  let service: PlaceIngestionService;

  beforeEach(() => {
    repository = new FakeRepository();
    dispatcher = {
      dispatchCity: jest.fn().mockResolvedValue(undefined),
      dispatchPlaceTexts: jest.fn().mockResolvedValue(undefined),
      dispatchPlaceImages: jest.fn().mockResolvedValue(undefined),
    };
    discovery = {
      resolveCity: jest
        .fn()
        .mockResolvedValue({ wikidataId: 'Q597', label: 'Lisbon' }),
      discover: jest
        .fn()
        .mockResolvedValue(
          discovered([poi('Torre de Belém', 'Q1'), poi('Sé', 'Q2')]),
        ),
    };
    wikimedia = {
      imageInfo: jest.fn().mockResolvedValue({
        url: 'https://upload.wikimedia.org/thumb/x.jpg',
        mime: 'image/jpeg',
        license: 'CC BY-SA 4.0',
        author: 'Alvesgaspar',
      }),
      download: jest.fn().mockResolvedValue(Buffer.from('img-bytes')),
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

    storage = {
      uploadFileAtKey: jest.fn().mockResolvedValue({
        url: 'https://cdn.example/places/pt/lisbon/x.jpg',
        key: 'places/pt/lisbon/x.jpg',
      }),
    };
    service = new PlaceIngestionService(
      repository as unknown as PlaceIngestionRepository,
      discovery as unknown as WikidataDiscoveryService,
      wikimedia as unknown as WikimediaService,
      aiRouter as unknown as AiRouterService,
      storage as unknown as StorageService,
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

    it('fails for good when the city is not on Wikidata — never guesses', async () => {
      // A retry will not create the entity. The admin sees the real reason.
      discovery.resolveCity.mockRejectedValue(
        new CityNotResolvedError('XX', 'Nowhere'),
      );

      await expect(service.ingestCity(INGESTION_ID)).rejects.toThrow(
        PermanentIngestionError,
      );
      expect(discovery.discover).not.toHaveBeenCalled();
    });

    it('treats a Wikidata outage as retryable, not as a verdict', async () => {
      discovery.discover.mockRejectedValue(new Error('WDQS answered 502'));

      await expect(service.ingestCity(INGESTION_ID)).rejects.toThrow(
        RetryableIngestionError,
      );
    });

    it('records what discovery found and what it dropped', async () => {
      // The drop count is the honesty line on the review screen: "431 seen,
      // 209 classified" tells the reviewer how much the class table left out.
      discovery.discover.mockResolvedValue(
        discovered([poi('Torre de Belém', 'Q1'), poi('Sé', 'Q2')], 223),
      );

      await service.ingestCity(INGESTION_ID);

      expect(repository.savedStats).toMatchObject({
        rawElements: 225,
        droppedAsUnmapped: 223,
        withEnwiki: 2,
      });
    });

    it('finishes the ingestion when every place was already curated', async () => {
      repository.persistDrafts.mockResolvedValue({
        created: [],
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
        sourceUrl: string;
      }[];

    it('points sourceUrl at the Wikidata entity', async () => {
      // CC0, so no attribution obligation — but the link is how a reviewer
      // audits where a place came from.
      await service.ingestCity(INGESTION_ID);

      expect(persisted()[0].sourceUrl).toBe('https://www.wikidata.org/wiki/Q1');
    });

    it('gives two different places sharing a name distinct slugs', async () => {
      // "Forte de São João Baptista" is two different forts in Porto. Colliding
      // on [countryCode, city, slug] would make the second upsert overwrite the
      // first, losing a place while still reporting both as created.
      discovery.discover.mockResolvedValue(
        discovered([
          poi('Forte de São João Baptista', 'Q10283826'),
          poi('Forte de São João Baptista', 'Q10284015'),
        ]),
      );
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

    it('scores from 100 down whatever the number kept, and cuts at the cap', async () => {
      // The old formula was welded to a cut of ten: past it, scores went
      // negative, ordering backwards and failing the admin PATCH validation.
      // Offering more candidates than the cap also proves the cut itself.
      const many = Array.from({ length: 40 }, (_, i) =>
        poi(`Place ${i}`, `Q${i}`),
      );
      discovery.discover.mockResolvedValue(discovered(many));
      wikimedia.popularity.mockResolvedValue(
        many.map((place, i) => signal(place.wikidataId, 10_000 - i)),
      );

      await service.ingestCity(INGESTION_ID);

      const scores = persisted().map((place) => place.popularityScore);
      expect(scores).toHaveLength(30);
      expect(scores[0]).toBe(100);
      expect(scores.at(-1)).toBe(3);
      expect(Math.min(...scores)).toBeGreaterThan(0);
      expect([...scores].sort((a, b) => b - a)).toEqual(scores);
    });

    it('reproduces the original scale when ten places are kept', async () => {
      const ten = Array.from({ length: 10 }, (_, i) =>
        poi(`Place ${i}`, `Q${i}`),
      );
      discovery.discover.mockResolvedValue(discovered(ten));
      wikimedia.popularity.mockResolvedValue(
        ten.map((place, i) => signal(place.wikidataId, 10_000 - i)),
      );

      await service.ingestCity(INGESTION_ID);

      expect(persisted().map((place) => place.popularityScore)).toEqual([
        100, 90, 80, 70, 60, 50, 40, 30, 20, 10,
      ]);
    });
  });

  describe('images', () => {
    it('fans out image jobs only for places whose entity has a P18', async () => {
      discovery.discover.mockResolvedValue(
        discovered([poi('Torre de Belém', 'Q1'), poi('Sé de Lisboa', 'Q2')]),
      );
      wikimedia.popularity.mockResolvedValue([
        signal('Q1', 13000, 'Torre de Belém.jpg'),
        signal('Q2', 4000, null),
      ]);
      repository.persistDrafts.mockResolvedValue({
        created: [
          { id: 'place-1', slug: 'torre-de-belem' },
          { id: 'place-2', slug: 'se-de-lisboa' },
        ],
        conflicts: [],
      });

      await service.ingestCity(INGESTION_ID);

      expect(dispatcher.dispatchPlaceImages).toHaveBeenCalledWith([
        {
          placeId: 'place-1',
          ingestionId: INGESTION_ID,
          commonsFile: 'Torre de Belém.jpg',
        },
      ]);
    });

    it('stores the image at a deterministic key, with its attribution', async () => {
      // Deterministic key: a re-run overwrites the same object instead of
      // piling up UUIDs; and CC licences require author + licence wherever
      // the image shows, so they land next to the URL.
      await service.writePlaceImage('place-1', 'Torre de Belém.jpg');

      expect(storage.uploadFileAtKey).toHaveBeenCalledWith(
        expect.any(Buffer),
        'places/pt/lisbon/torre-de-belem.jpg',
        'image/jpeg',
      );
      expect(repository.savePlaceImage).toHaveBeenCalledWith('place-1', {
        imageUrl: 'https://cdn.example/places/pt/lisbon/x.jpg',
        imageLicense: 'CC BY-SA 4.0',
        imageAuthor: 'Alvesgaspar',
      });
    });

    it('gives up for good when Commons cannot resolve the file', async () => {
      // A deleted file will not come back on retry.
      wikimedia.imageInfo.mockResolvedValue(null);

      await expect(
        service.writePlaceImage('place-1', 'Gone.jpg'),
      ).rejects.toThrow(PermanentIngestionError);
      expect(storage.uploadFileAtKey).not.toHaveBeenCalled();
    });

    it('retries a failed download', async () => {
      wikimedia.download.mockResolvedValue(null);

      await expect(
        service.writePlaceImage('place-1', 'Torre.jpg'),
      ).rejects.toThrow(RetryableIngestionError);
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
