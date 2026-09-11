// Importing `@app/database` for the type alone would drag better-auth into the
// suite. Same shortcut the blog-translation specs take.
jest.mock('@app/database', () => ({
  PrismaService: jest.fn(),
  DatabaseModule: jest.fn(),
}));

jest.mock('../../../../generated/prisma', () => ({
  PlaceCategory: { LANDMARK: 'LANDMARK' },
  CityIngestionStatus: { PROCESSING: 'PROCESSING' },
}));

import { PrismaService } from '@app/database';
import { PlaceCategory } from '../../../../generated/prisma';
import {
  PlaceIngestionRepository,
  type PlaceToPersist,
} from './place-ingestion.repository';

const poi = (slug: string, name: string): PlaceToPersist => ({
  name,
  slug,
  category: PlaceCategory.LANDMARK,
  lat: 38.6,
  lng: -9.2,
  isFree: false,
  wikidataId: 'Q1',
  wikipediaMonthlyViews: 1000,
  popularityScore: 100,
  sourceUrl: 'https://www.wikidata.org/wiki/Q1',
});

const LISBON = {
  countryCode: 'PT',
  city: 'Lisbon',
  cityKey: 'lisbon',
  state: null,
  stateKey: null,
};

type UpsertArgs = {
  where: { countryCode_city_stateKey_slug: Record<string, string> };
  create: Record<string, unknown>;
};

describe('PlaceIngestionRepository', () => {
  let prisma: {
    place: { findMany: jest.Mock; upsert: jest.Mock };
  };
  let repository: PlaceIngestionRepository;

  beforeEach(() => {
    prisma = {
      place: {
        findMany: jest.fn().mockResolvedValue([]),
        upsert: jest
          .fn()
          .mockImplementation(({ create }: { create: { slug: string } }) =>
            Promise.resolve({ id: `id-${create.slug}` }),
          ),
      },
    };
    repository = new PlaceIngestionRepository(
      prisma as unknown as PrismaService,
    );
  });

  describe('persistDrafts', () => {
    it('never touches a place that is not a draft, and reports it as a conflict', async () => {
      // Lisbon's ten curated places are the pilot's control group. If a run
      // could overwrite them there would be nothing left to compare against.
      prisma.place.findMany.mockResolvedValue([{ slug: 'torre-de-belem' }]);

      const result = await repository.persistDrafts(
        'ingestion-1',
        LISBON,
        'country-1',
        [poi('torre-de-belem', 'Torre de Belém'), poi('mosteiro', 'Mosteiro')],
      );

      const upsertedSlugs = prisma.place.upsert.mock.calls.map(
        ([args]: [{ create: { slug: string } }]) => args.create.slug,
      );
      expect(upsertedSlugs).toEqual(['mosteiro']);
      expect(result.created).toEqual([{ id: 'id-mosteiro', slug: 'mosteiro' }]);
      expect(result.conflicts).toEqual([
        {
          slug: 'torre-de-belem',
          wikidataId: 'Q1',
          rank: 1,
          monthlyViews: 1000,
        },
      ]);
    });

    it('writes new places as invisible drafts', async () => {
      await repository.persistDrafts('ingestion-1', LISBON, null, [
        poi('mosteiro', 'Mosteiro'),
      ]);

      const [args] = prisma.place.upsert.mock.calls[0] as [
        { create: { reviewStatus: string; isActive: boolean } },
      ];
      expect(args.create.reviewStatus).toBe('DRAFT');
      expect(args.create.isActive).toBe(false);
    });

    it('files a city with no state under the empty key, so a re-run still lands on its rows', async () => {
      // A NULL in the unique key would differ from every other NULL, and the
      // upsert would duplicate a place where it used to update it.
      await repository.persistDrafts('ingestion-1', LISBON, null, [
        poi('mosteiro', 'Mosteiro'),
      ]);

      const [args] = prisma.place.upsert.mock.calls[0] as [UpsertArgs];
      expect(args.where.countryCode_city_stateKey_slug).toEqual({
        countryCode: 'PT',
        city: 'Lisbon',
        stateKey: '',
        slug: 'mosteiro',
      });
    });

    it('keeps the places of one Campo Grande apart from the other', async () => {
      await repository.persistDrafts(
        'ingestion-1',
        {
          countryCode: 'BR',
          city: 'Campo Grande',
          cityKey: 'campo grande',
          state: 'Alagoas',
          stateKey: 'alagoas',
        },
        null,
        [poi('catedral', 'Catedral')],
      );

      const [args] = prisma.place.upsert.mock.calls[0] as [UpsertArgs];
      expect(args.where.countryCode_city_stateKey_slug.stateKey).toBe(
        'alagoas',
      );
      expect(args.create).toMatchObject({
        state: 'Alagoas',
        stateKey: 'alagoas',
      });
      // The curated-place guard reads the same city, not its namesake.
      expect(prisma.place.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({ stateKey: 'alagoas' }) as unknown,
        }),
      );
    });

    it('copies the city key the API folded onto the place, on create and on update', async () => {
      // Without it the place is written with no key and the NOT NULL column
      // refuses it — or, worse, a re-run leaves an old key standing.
      await repository.persistDrafts(
        'ingestion-1',
        { ...LISBON, city: 'Póvoa de Varzim', cityKey: 'povoa de varzim' },
        null,
        [poi('igreja-matriz', 'Igreja Matriz')],
      );

      const [args] = prisma.place.upsert.mock.calls[0] as [
        {
          create: Record<string, unknown>;
          update: Record<string, unknown>;
        },
      ];
      expect(args.create).toMatchObject({
        city: 'Póvoa de Varzim',
        cityKey: 'povoa de varzim',
      });
      expect(args.update).toMatchObject({ cityKey: 'povoa de varzim' });
    });
  });
});
