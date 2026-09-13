jest.mock('@app/config/env', () => ({
  env: {
    INGESTION_USER_AGENT: 'aloravia-test/1.0',
    // Small on purpose: the cut is provable with five candidates instead of
    // a hundred and one.
    PLACES_PER_SWEEP: 3,
  },
}));

jest.mock('@app/database', () => ({
  PrismaService: jest.fn(),
  DatabaseModule: jest.fn(),
}));

jest.mock('../../../../generated/prisma', () => ({
  // All eight, not a sample: "empty means all" has to prove eight discovery
  // calls, and a two-value mock would let it pass proving two.
  PlaceCategory: {
    LANDMARK: 'LANDMARK',
    MUSEUM: 'MUSEUM',
    NATURE: 'NATURE',
    BEACH: 'BEACH',
    VIEWPOINT: 'VIEWPOINT',
    FOOD_MARKET: 'FOOD_MARKET',
    NIGHTLIFE: 'NIGHTLIFE',
    NEIGHBORHOOD: 'NEIGHBORHOOD',
  },
  // The factory replaces the module whole: without this the service imports
  // `CityIngestionScope` as undefined and every test here dies on the scope
  // check, not on what it meant to prove.
  CityIngestionScope: { CITY: 'CITY', COUNTRY: 'COUNTRY' },
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
  CountryNotSupportedError,
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

/** A place as `discoverInCountry` answers it: with a city of its own. */
const inCountry = (
  name: string,
  qid: string,
  city: { qid: string; label: string; km?: number } = {
    qid: 'Q597',
    label: 'Lisbon',
  },
) => ({
  ...poi(name, qid),
  city:
    city.km === undefined
      ? { wikidataId: city.qid, label: city.label, source: 'WIKIDATA_P131' }
      : {
          wikidataId: city.qid,
          label: city.label,
          source: 'NEAREST_MUNICIPALITY',
          distanceKm: city.km,
        },
});

/** The full `CountryDiscovery` shape, zeroed except for what a test cares about. */
const countryDiscovered = (
  places: ReturnType<typeof inCountry>[],
  over: Record<string, unknown> = {},
) => ({
  places,
  rawCount: places.length,
  droppedAsExcluded: 0,
  fromP131: 0,
  fromProximity: 0,
  cityNotFound: 0,
  cityLookupFailed: 0,
  classesFailed: [],
  truncated: false,
  ...over,
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
    scope: 'CITY',
    categories: [],
    city: 'Lisbon',
    cityKey: 'lisbon',
    state: null,
    stateKey: null,
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
  saveCityWikidataId = jest.fn().mockResolvedValue(undefined);
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
        { id: 'place-1', wikidataId: 'Q1' },
        { id: 'place-2', wikidataId: 'Q2' },
        { id: 'place-3', wikidataId: 'Q3' },
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

  countTextFailures = jest
    .fn()
    .mockImplementation(() => Promise.resolve(this.failures.length));

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
  let discovery: {
    resolveCity: jest.Mock;
    discover: jest.Mock;
    discoverInCountry: jest.Mock;
  };
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
      discoverInCountry: jest.fn().mockResolvedValue(countryDiscovered([])),
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
      await service.ingest(INGESTION_ID);

      expect(dispatcher.dispatchPlaceTexts).toHaveBeenCalledTimes(1);
      expect(dispatcher.dispatchPlaceTexts).toHaveBeenCalledWith([
        { placeId: 'place-1', ingestionId: INGESTION_ID },
        { placeId: 'place-2', ingestionId: INGESTION_ID },
        { placeId: 'place-3', ingestionId: INGESTION_ID },
      ]);
    });

    it('keeps the entity the city resolved to', async () => {
      // It used to reach the log and nothing else.
      await service.ingest(INGESTION_ID);

      expect(repository.saveCityWikidataId).toHaveBeenCalledWith(
        INGESTION_ID,
        'Q597',
      );
    });

    it('resolves the city in its state and files the places under it', async () => {
      // Both keys come from the ingestion row, as the API folded them: the
      // worker copies them and never folds a name on its own.
      repository.findIngestion.mockResolvedValue({
        id: INGESTION_ID,
        countryCode: 'BR',
        scope: 'CITY',
        categories: [],
        city: 'Campo Grande',
        cityKey: 'campo grande',
        state: 'Alagoas',
        stateKey: 'alagoas',
      });

      await service.ingest(INGESTION_ID);

      expect(discovery.resolveCity).toHaveBeenCalledWith(
        'BR',
        'Campo Grande',
        'Alagoas',
      );
      // The location travels on each place now, the same object for all of
      // them: one city was asked for, and the API folded its keys.
      expect(repository.persistDrafts).toHaveBeenCalledWith(
        INGESTION_ID,
        'country-1',
        expect.arrayContaining([
          expect.objectContaining({
            location: {
              countryCode: 'BR',
              city: 'Campo Grande',
              cityKey: 'campo grande',
              state: 'Alagoas',
              stateKey: 'alagoas',
            },
            nearestMunicipalityKm: null,
          }),
        ]),
      );
    });

    it('fails for good when the city is not on Wikidata — never guesses', async () => {
      // A retry will not create the entity. The admin sees the real reason.
      discovery.resolveCity.mockRejectedValue(
        new CityNotResolvedError('XX', 'Nowhere'),
      );

      await expect(service.ingest(INGESTION_ID)).rejects.toThrow(
        PermanentIngestionError,
      );
      expect(discovery.discover).not.toHaveBeenCalled();
    });

    it('treats a Wikidata outage as retryable, not as a verdict', async () => {
      discovery.discover.mockRejectedValue(new Error('WDQS answered 502'));

      await expect(service.ingest(INGESTION_ID)).rejects.toThrow(
        RetryableIngestionError,
      );
    });

    it('records what discovery found and what it dropped', async () => {
      // The drop count is the honesty line on the review screen: "431 seen,
      // 209 classified" tells the reviewer how much the class table left out.
      discovery.discover.mockResolvedValue(
        discovered([poi('Torre de Belém', 'Q1'), poi('Sé', 'Q2')], 223),
      );

      await service.ingest(INGESTION_ID);

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

      await service.ingest(INGESTION_ID);

      expect(dispatcher.dispatchPlaceTexts).not.toHaveBeenCalled();
      expect(repository.status).toBe('READY_FOR_REVIEW');
    });
  });

  describe('country sweep', () => {
    /** What the sweep handed the repository, in the order it handed it. */
    const persisted = () =>
      repository.persistDrafts.mock.calls[0][2] as {
        slug: string;
        wikidataId: string;
        category: string;
        popularityScore: number;
        nearestMunicipalityKm: number | null;
        location: {
          countryCode: string;
          city: string;
          cityKey: string;
          state: string | null;
          stateKey: string | null;
        };
      }[];

    const sweep = (categories: string[] = ['BEACH']) => {
      repository.findIngestion.mockResolvedValue({
        id: INGESTION_ID,
        countryCode: 'PT',
        scope: 'COUNTRY',
        categories,
        city: null,
        cityKey: null,
        state: null,
        stateKey: null,
      });
    };

    it('asks Wikidata once per category, in the order the admin listed', async () => {
      sweep(['BEACH', 'MUSEUM']);

      await service.ingest(INGESTION_ID);

      expect(discovery.discoverInCountry).toHaveBeenCalledTimes(2);
      const asked = (
        discovery.discoverInCountry.mock.calls as [string, string][]
      ).map((call) => call[1]);
      expect(asked).toEqual(['BEACH', 'MUSEUM']);
      expect(discovery.resolveCity).not.toHaveBeenCalled();
    });

    it('reads an empty list of categories as all of them', async () => {
      sweep([]);

      await service.ingest(INGESTION_ID);

      expect(discovery.discoverInCountry).toHaveBeenCalledTimes(8);
    });

    it('gives an item claimed by two categories to the first one asked for', async () => {
      sweep(['BEACH', 'NATURE']);
      // The real discovery stamps each place with the class it was asked for,
      // so the same beach comes back as BEACH from one query and as NATURE
      // from the other. Which copy survives is the whole point.
      discovery.discoverInCountry
        .mockResolvedValueOnce(
          countryDiscovered([
            { ...inCountry('Benagil', 'Q1'), category: 'BEACH' },
          ] as ReturnType<typeof inCountry>[]),
        )
        .mockResolvedValueOnce(
          countryDiscovered([
            { ...inCountry('Benagil', 'Q1'), category: 'NATURE' },
          ] as ReturnType<typeof inCountry>[]),
        );
      wikimedia.popularity.mockResolvedValue([signal('Q1', 900)]);

      await service.ingest(INGESTION_ID);

      expect(persisted()).toHaveLength(1);
      expect(persisted()[0].category).toBe('BEACH');
      expect(repository.savedStats).toMatchObject({ claimedTwice: 1 });
    });

    it('goes on without a category that failed, and says which', async () => {
      sweep(['BEACH', 'MUSEUM']);
      discovery.discoverInCountry
        .mockRejectedValueOnce(new Error('WDQS answered 502'))
        .mockResolvedValueOnce(countryDiscovered([inCountry('MAAT', 'Q2')]));
      wikimedia.popularity.mockResolvedValue([signal('Q2', 500)]);

      await service.ingest(INGESTION_ID);

      expect(persisted()).toHaveLength(1);
      expect(repository.savedStats).toMatchObject({
        categoriesFailed: ['BEACH'],
      });
    });

    it('treats every category failing as an outage, not as an empty country', async () => {
      sweep(['BEACH']);
      discovery.discoverInCountry.mockRejectedValue(new Error('WDQS 502'));

      await expect(service.ingest(INGESTION_ID)).rejects.toThrow(
        RetryableIngestionError,
      );
    });

    it('fails for good on a country Wikidata cannot name', async () => {
      sweep(['BEACH']);
      discovery.discoverInCountry.mockRejectedValue(
        new CountryNotSupportedError('ZZ'),
      );

      await expect(service.ingest(INGESTION_ID)).rejects.toThrow(
        PermanentIngestionError,
      );
      expect(repository.persistDrafts).not.toHaveBeenCalled();
    });

    it('never writes a place it cannot name a city for', async () => {
      sweep(['BEACH']);
      discovery.discoverInCountry.mockResolvedValue(
        countryDiscovered(
          [
            inCountry('Praia com cidade', 'Q1'),
            // No city at all, and a city whose label is its own QID: both
            // would reach a public screen as nonsense.
            { ...poi('Praia sem cidade', 'Q2') },
            inCountry('Praia sem rótulo', 'Q3', {
              qid: 'Q9999',
              label: 'Q9999',
            }),
          ] as ReturnType<typeof inCountry>[],
          { cityNotFound: 1 },
        ),
      );
      wikimedia.popularity.mockResolvedValue([
        signal('Q1', 900),
        signal('Q2', 800),
        signal('Q3', 700),
      ]);

      await service.ingest(INGESTION_ID);

      expect(persisted().map((place) => place.wikidataId)).toEqual(['Q1']);
      expect(repository.savedStats).toMatchObject({
        withoutCity: { notFound: 1, lookupFailed: 0, unlabelled: 1 },
      });
    });

    it('folds the city of each place, and leaves the state to the review', async () => {
      sweep(['BEACH']);
      discovery.discoverInCountry.mockResolvedValue(
        countryDiscovered([
          inCountry('Praia da Rocha', 'Q1', {
            qid: 'Q2',
            label: 'Póvoa de Varzim',
          }),
        ]),
      );
      wikimedia.popularity.mockResolvedValue([signal('Q1', 900)]);

      await service.ingest(INGESTION_ID);

      expect(persisted()[0].location).toEqual({
        countryCode: 'PT',
        city: 'Póvoa de Varzim',
        cityKey: 'povoa de varzim',
        state: null,
        stateKey: null,
      });
    });

    it('keeps the distance only for the cities it had to infer', async () => {
      sweep(['BEACH']);
      discovery.discoverInCountry.mockResolvedValue(
        countryDiscovered([
          inCountry('Declarada', 'Q1', { qid: 'Q10', label: 'Machico' }),
          inCountry('Inferida', 'Q2', {
            qid: 'Q11',
            label: 'Albufeira',
            km: 3.9,
          }),
        ]),
      );
      wikimedia.popularity.mockResolvedValue([
        signal('Q1', 900),
        signal('Q2', 800),
      ]);

      await service.ingest(INGESTION_ID);

      const byQid = new Map(persisted().map((p) => [p.wikidataId, p]));
      expect(byQid.get('Q1')?.nearestMunicipalityKm).toBeNull();
      expect(byQid.get('Q2')?.nearestMunicipalityKm).toBe(3.9);
      expect(repository.savedStats).toMatchObject({
        citiesFromP131: 1,
        citiesFromProximity: 1,
      });
    });

    it('cuts at the sweep ceiling, keeping the most visited', async () => {
      sweep(['BEACH']);
      discovery.discoverInCountry.mockResolvedValue(
        countryDiscovered([
          inCountry('A', 'Q1'),
          inCountry('B', 'Q2'),
          inCountry('C', 'Q3'),
          inCountry('D', 'Q4'),
          inCountry('E', 'Q5'),
        ]),
      );
      wikimedia.popularity.mockResolvedValue([
        signal('Q1', 100),
        signal('Q2', 900),
        signal('Q3', 500),
        signal('Q4', 50),
        signal('Q5', 700),
      ]);

      await service.ingest(INGESTION_ID);

      // PLACES_PER_SWEEP is 3 in this suite's env mock.
      expect(persisted().map((p) => p.wikidataId)).toEqual(['Q2', 'Q5', 'Q3']);
    });

    it('lets two cities hold the same slug, and only collides inside one', async () => {
      sweep(['BEACH']);
      discovery.discoverInCountry.mockResolvedValue(
        countryDiscovered([
          inCountry('Sé', 'Q1', { qid: 'Q10', label: 'Lisbon' }),
          inCountry('Sé', 'Q2', { qid: 'Q11', label: 'Porto' }),
          inCountry('Sé', 'Q3', { qid: 'Q11', label: 'Porto' }),
        ]),
      );
      wikimedia.popularity.mockResolvedValue([
        signal('Q1', 900),
        signal('Q2', 800),
        signal('Q3', 700),
      ]);

      await service.ingest(INGESTION_ID);

      const slugs = new Map(persisted().map((p) => [p.wikidataId, p.slug]));
      expect(slugs.get('Q1')).toBe('se');
      expect(slugs.get('Q2')).toBe('se');
      expect(slugs.get('Q3')).toBe('se-q3');
    });

    it('scores each place inside its own city, not against the country', async () => {
      sweep(['BEACH']);
      discovery.discoverInCountry.mockResolvedValue(
        countryDiscovered([
          inCountry('Muito visitada', 'Q1', { qid: 'Q10', label: 'Lisbon' }),
          inCountry('Pouco visitada', 'Q2', { qid: 'Q11', label: 'Aljezur' }),
        ]),
      );
      wikimedia.popularity.mockResolvedValue([
        signal('Q1', 9000),
        signal('Q2', 12),
      ]);

      await service.ingest(INGESTION_ID);

      // Alone in its city, the quiet one is that city's first place — not a 3
      // out of 100 sitting beside another city's curated hundreds.
      const scores = new Map(
        persisted().map((p) => [p.wikidataId, p.popularityScore]),
      );
      expect(scores.get('Q1')).toBe(100);
      expect(scores.get('Q2')).toBe(100);
    });

    it('sends each photograph to the place it belongs to', async () => {
      // Pairing by slug would hand Porto's `sé` the photograph of Lisbon's.
      sweep(['BEACH']);
      discovery.discoverInCountry.mockResolvedValue(
        countryDiscovered([
          inCountry('Sé', 'Q1', { qid: 'Q10', label: 'Lisbon' }),
          inCountry('Sé', 'Q2', { qid: 'Q11', label: 'Porto' }),
        ]),
      );
      wikimedia.popularity.mockResolvedValue([
        signal('Q1', 900, null),
        signal('Q2', 800, 'Sé do Porto.jpg'),
      ]);
      repository.persistDrafts.mockResolvedValue({
        created: [
          { id: 'place-lisboa', wikidataId: 'Q1' },
          { id: 'place-porto', wikidataId: 'Q2' },
        ],
        conflicts: [],
      });

      await service.ingest(INGESTION_ID);

      expect(dispatcher.dispatchPlaceImages).toHaveBeenCalledWith([
        {
          placeId: 'place-porto',
          ingestionId: INGESTION_ID,
          commonsFile: 'Sé do Porto.jpg',
        },
      ]);
    });

    it('walks the steps a sweep has, and none it does not', async () => {
      sweep(['BEACH']);
      discovery.discoverInCountry.mockResolvedValue(
        countryDiscovered([inCountry('Benagil', 'Q1')]),
      );
      wikimedia.popularity.mockResolvedValue([signal('Q1', 900)]);

      await service.ingest(INGESTION_ID);

      const steps = (repository.markStep.mock.calls as [string, string][]).map(
        (call) => call[1],
      );
      expect(steps).toEqual(['discover', 'rank', 'write_texts']);
      expect(steps).not.toContain('resolve_city');
    });
  });

  describe('ranking', () => {
    /** Persisted places, whatever the fake repository was told to create. */
    const persisted = () =>
      repository.persistDrafts.mock.calls[0][2] as {
        slug: string;
        wikidataId: string;
        popularityScore: number;
        sourceUrl: string;
        nearestMunicipalityKm: number | null;
        location: { city: string; cityKey: string; stateKey: string | null };
      }[];

    it('points sourceUrl at the Wikidata entity', async () => {
      // CC0, so no attribution obligation — but the link is how a reviewer
      // audits where a place came from.
      await service.ingest(INGESTION_ID);

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

      await service.ingest(INGESTION_ID);

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

      await service.ingest(INGESTION_ID);

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

      await service.ingest(INGESTION_ID);

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
          { id: 'place-1', wikidataId: 'Q1' },
          { id: 'place-2', wikidataId: 'Q2' },
        ],
        conflicts: [],
      });

      await service.ingest(INGESTION_ID);

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

    it('puts the state in the key only when the place has one', async () => {
      // Two Campo Grandes must not overwrite each other's `catedral`; a place
      // with no state keeps the shape its stored URL already has.
      repository.findPlace.mockResolvedValueOnce({
        id: 'place-1',
        slug: 'catedral',
        name: 'Catedral',
        category: 'LANDMARK',
        city: 'Campo Grande',
        state: 'Alagoas',
        countryCode: 'BR',
        isFree: false,
        wikidataId: 'Q1',
        wikipediaMonthlyViews: 100,
      });

      await service.writePlaceImage('place-1', 'Catedral.jpg');

      expect(storage.uploadFileAtKey).toHaveBeenCalledWith(
        expect.any(Buffer),
        'places/br/alagoas/campo-grande/catedral.jpg',
        'image/jpeg',
      );
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
      await service.ingest(INGESTION_ID);

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
      await service.ingest(INGESTION_ID);
      for (const placeId of ['place-1', 'place-2', 'place-3']) {
        await service.writePlaceTexts(placeId, INGESTION_ID);
      }

      const replay = await service.writePlaceTexts('place-3', INGESTION_ID);

      expect(replay.ingestionBecameReady).toBe(false);
    });

    it('a text that failed for good still lets the city finish', async () => {
      await service.ingest(INGESTION_ID);
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

    it('can say how many places came out with no text', async () => {
      // The number the admin is told when the city is announced ready. It was
      // recorded from the first day and read by nobody, which is how a place
      // with no description sat in a city that called itself reviewable.
      await service.ingest(INGESTION_ID);
      await service.abandonPlaceTexts(INGESTION_ID, 'place-3');

      await expect(service.countTextFailures(INGESTION_ID)).resolves.toBe(1);
    });

    it('names the model that failed when no answer could be used', async () => {
      // This branch had no test at all, which is how 31 Sentry events managed
      // to say a place had no usable JSON without ever saying who wrote it.
      aiRouter.generateJson.mockResolvedValueOnce({
        data: null,
        result: { model: 'deepseek/deepseek-v4-flash', usage: {} },
      });

      await service.ingest(INGESTION_ID);

      await expect(
        service.writePlaceTexts('place-1', INGESTION_ID),
      ).rejects.toThrow(/deepseek\/deepseek-v4-flash/);
    });
  });
});
