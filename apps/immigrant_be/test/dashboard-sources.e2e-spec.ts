/**
 * `@app/database` re-exports DatabaseModule, which imports AppConfigModule and
 * therefore drags better-auth (ESM) into the Jest runtime. Stubbing the barrel
 * keeps the HTTP layer under test real while avoiding that transitive load.
 */
jest.mock('@app/database', () => ({
  PrismaService: class PrismaService {},
  DatabaseModule: class DatabaseModule {},
}));

jest.mock('@thallesp/nestjs-better-auth', () => ({
  AllowAnonymous: () => () => undefined,
  Session: () => () => undefined,
  AuthGuard: class AuthGuard {},
}));

import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { CountryController } from '../src/countries/country.controller';
import { CountryService } from '../src/countries/country.service';
import { CountryRepository } from '../src/countries/country.repository';
import { BlogController } from '../src/blog/blog.controller';
import { BlogService } from '../src/blog/blog.service';
import { BlogRepository } from '../src/blog/blog.repository';
import { AllExceptionsFilter } from '../src/common/filters/all-exceptions.filter';

/**
 * The fields `components/dashboard/destination-highlights.tsx` reads off every
 * country. Named here so a rename on this side fails the build instead of
 * silently blanking a card.
 */
const COUNTRY_FIELDS_USED_BY_DASHBOARD = [
  'id',
  'name',
  'flag',
  'region',
  'difficulty',
  'difficulty_score',
  'translations',
];

/** Same, for `components/dashboard/immigration-news.tsx`. */
const POST_FIELDS_USED_BY_DASHBOARD = [
  'id',
  'title',
  'slug',
  'excerpt',
  'cover_image_url',
  'published_at',
  'category',
  'tags',
];

const country = {
  id: 'country-1',
  name: 'Portugal',
  flag: '🇵🇹',
  region: 'Europe',
  difficulty: 'Medium',
  difficulty_score: 5,
  visa_options: ['D7'],
  job_market: 'Growing tech sector',
  popular_cities: ['Porto'],
  background_image: 'https://example.com/porto.png',
  translations: [
    {
      language: 'pt',
      description: 'Descrição',
      benefits: ['Clima'],
      challenges: ['Burocracia'],
      processing_time: '4-6 meses',
      investment_required: '€ 9.840',
      language_requirement: 'Português A2',
    },
  ],
};

const post = {
  id: 'post-1',
  title: 'Como funciona o visto D7',
  slug: 'como-funciona-o-visto-d7',
  excerpt: 'Um resumo do processo.',
  cover_image_url: 'https://example.com/cover.png',
  published_at: '2026-08-01T00:00:00.000Z',
  created_at: '2026-07-30T00:00:00.000Z',
  category: { id: 'cat-1', name: 'Vistos', slug: 'vistos' },
  tags: [{ id: 'tag-1', name: 'D7', slug: 'd7' }],
  _count: { likes: 0 },
};

/**
 * Pins the contract between this API and the dashboard that consumes it.
 *
 * The five cards the issue named were removed from the frontend rather than
 * wired up (see docs/DATA_SOURCES.md), so what is left to protect is the set of
 * endpoints the dashboard actually calls: the shape it reads, and what happens
 * when the source fails. Repositories are mocked; controller, service, pipes
 * and the exception filter are the real ones, as in health.e2e-spec.ts.
 */
describe('Dashboard data sources (e2e)', () => {
  let app: INestApplication;
  const countryRepository = { findAll: jest.fn() };
  const blogRepository = { findPublishedPosts: jest.fn() };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [CountryController, BlogController],
      providers: [
        CountryService,
        BlogService,
        { provide: CountryRepository, useValue: countryRepository },
        { provide: BlogRepository, useValue: blogRepository },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api/v1');
    app.useGlobalFilters(new AllExceptionsFilter());
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: { enableImplicitConversion: true },
      }),
    );
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /countries — curated destinations', () => {
    it('serves every field the dashboard reads', async () => {
      countryRepository.findAll.mockResolvedValue([country]);

      const response = await request(app.getHttpServer())
        .get('/api/v1/countries')
        .expect(200);

      expect(response.body).toHaveLength(1);
      for (const field of COUNTRY_FIELDS_USED_BY_DASHBOARD) {
        expect(response.body[0]).toHaveProperty(field);
      }
    });

    /**
     * The dashboard sorts by `difficulty_score` and shows `processing_time` off
     * the translation, so both have to survive serialisation with their types.
     */
    it('keeps difficulty_score numeric and processing_time on the translation', async () => {
      countryRepository.findAll.mockResolvedValue([country]);

      const response = await request(app.getHttpServer())
        .get('/api/v1/countries')
        .expect(200);

      expect(typeof response.body[0].difficulty_score).toBe('number');
      expect(response.body[0].translations[0].processing_time).toBe(
        '4-6 meses',
      );
    });

    it('answers with an empty list when no country is registered', async () => {
      countryRepository.findAll.mockResolvedValue([]);

      const response = await request(app.getHttpServer())
        .get('/api/v1/countries')
        .expect(200);

      expect(response.body).toEqual([]);
    });

    it('fails loudly when the source is unreachable', async () => {
      countryRepository.findAll.mockRejectedValue(
        new Error('connection refused'),
      );

      const response = await request(app.getHttpServer())
        .get('/api/v1/countries')
        .expect(500);

      expect(response.body).toMatchObject({ statusCode: 500 });
    });
  });

  describe('GET /blog/posts — immigration news', () => {
    it('serves every field the dashboard reads', async () => {
      blogRepository.findPublishedPosts.mockResolvedValue({
        data: [post],
        total: 1,
      });

      const response = await request(app.getHttpServer())
        .get('/api/v1/blog/posts?limit=3')
        .expect(200);

      expect(response.body.data).toHaveLength(1);
      for (const field of POST_FIELDS_USED_BY_DASHBOARD) {
        expect(response.body.data[0]).toHaveProperty(field);
      }
    });

    /**
     * The dashboard calls this with `limit` only. The default on `page` is what
     * keeps the offset from becoming NaN — worth pinning down, since the
     * frontend relies on it without knowing it exists.
     */
    it('defaults page to 1 when the caller sends only a limit', async () => {
      blogRepository.findPublishedPosts.mockResolvedValue({
        data: [],
        total: 0,
      });

      const response = await request(app.getHttpServer())
        .get('/api/v1/blog/posts?limit=3')
        .expect(200);

      expect(response.body).toMatchObject({ page: 1, limit: 3 });
      expect(blogRepository.findPublishedPosts).toHaveBeenCalledWith(
        expect.objectContaining({ skip: 0, take: 3 }),
      );
    });

    it('rejects a limit beyond the allowed maximum', async () => {
      await request(app.getHttpServer())
        .get('/api/v1/blog/posts?limit=999')
        .expect(400);

      expect(blogRepository.findPublishedPosts).not.toHaveBeenCalled();
    });

    it('answers with an empty page when nothing is published', async () => {
      blogRepository.findPublishedPosts.mockResolvedValue({
        data: [],
        total: 0,
      });

      const response = await request(app.getHttpServer())
        .get('/api/v1/blog/posts?limit=3')
        .expect(200);

      expect(response.body.data).toEqual([]);
      expect(response.body.total).toBe(0);
    });

    it('fails loudly when the source is unreachable', async () => {
      blogRepository.findPublishedPosts.mockRejectedValue(
        new Error('connection refused'),
      );

      const response = await request(app.getHttpServer())
        .get('/api/v1/blog/posts?limit=3')
        .expect(500);

      expect(response.body).toMatchObject({ statusCode: 500 });
    });
  });
});
