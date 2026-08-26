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
  osmType: 'way',
  osmId: 1,
  wikidataId: 'Q1',
  wikipediaMonthlyViews: 1000,
  popularityScore: 100,
  sourceUrl: 'https://www.openstreetmap.org/way/1',
});

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
        'PT',
        'Lisbon',
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
      await repository.persistDrafts('ingestion-1', 'PT', 'Lisbon', null, [
        poi('mosteiro', 'Mosteiro'),
      ]);

      const [args] = prisma.place.upsert.mock.calls[0] as [
        { create: { reviewStatus: string; isActive: boolean } },
      ];
      expect(args.create.reviewStatus).toBe('DRAFT');
      expect(args.create.isActive).toBe(false);
    });
  });
});
