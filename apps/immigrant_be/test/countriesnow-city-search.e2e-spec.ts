/**
 * The better-auth wrapper pulls in `@noble/ciphers`, which ships pure ESM and
 * cannot be loaded by the CommonJS Jest runtime. The controller only uses it
 * for the `@AllowAnonymous()` marker, so a no-op decorator is enough here.
 */
jest.mock('@thallesp/nestjs-better-auth', () => ({
  AllowAnonymous: () => () => undefined,
  Session: () => () => undefined,
  AuthGuard: class AuthGuard {},
}));

import { INestApplication, Logger, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { AllExceptionsFilter } from '../src/common/filters/all-exceptions.filter';
import { CountriesNowController } from '../src/countriesnow/countriesnow.controller';
import { CountriesNowService } from '../src/countriesnow/countriesnow.service';

const reply = (body: unknown): Response =>
  ({ ok: true, status: 200, json: () => Promise.resolve(body) }) as Response;

/**
 * Pins the contract the city selector reads: `[{ city, state }]`, with the
 * validation it relies on. CountriesNow is mocked at `fetch`; controller,
 * service, pipes and the exception filter are the real ones. No Redis client is
 * provided, which is also the proof that the service runs without one.
 */
describe('CountriesNow city search (e2e)', () => {
  let app: INestApplication;
  const fetchMock = jest.fn();

  beforeAll(async () => {
    global.fetch = fetchMock as unknown as typeof fetch;
    jest.spyOn(Logger.prototype, 'warn').mockImplementation(() => undefined);
    jest.spyOn(Logger.prototype, 'log').mockImplementation(() => undefined);

    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [CountriesNowController],
      providers: [CountriesNowService],
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
    jest.restoreAllMocks();
  });

  beforeEach(() => {
    fetchMock.mockReset();
  });

  it('rejects a search without q', async () => {
    await request(app.getHttpServer())
      .get('/api/v1/countriesnow/cities/search?country=Brazil')
      .expect(400);

    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('rejects a search without country', async () => {
    await request(app.getHttpServer())
      .get('/api/v1/countriesnow/cities/search?q=campo')
      .expect(400);
  });

  it('rejects a limit above 50', async () => {
    await request(app.getHttpServer())
      .get('/api/v1/countriesnow/cities/search?country=Brazil&q=campo&limit=99')
      .expect(400);

    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('answers 503 when CountriesNow is unreachable and nothing is cached', async () => {
    fetchMock.mockRejectedValue(new Error('ECONNREFUSED'));

    await request(app.getHttpServer())
      .get('/api/v1/countriesnow/cities/search?country=Brazil&q=campo')
      .expect(503);
  });

  it('answers each match as { city, state }', async () => {
    fetchMock.mockImplementation((input: string) => {
      const url = new URL(input);
      if (url.pathname.endsWith('/states/q')) {
        return Promise.resolve(
          reply({
            error: false,
            data: {
              states: [{ name: 'Alagoas' }, { name: 'Mato Grosso do Sul' }],
            },
          }),
        );
      }
      if (url.pathname.endsWith('/state/cities/q')) {
        return Promise.resolve(
          reply({
            error: false,
            data:
              url.searchParams.get('state') === 'Alagoas'
                ? ['Campo Grande', 'Maceió']
                : ['Campo Grande', 'Dourados'],
          }),
        );
      }
      return Promise.resolve(
        reply({
          error: false,
          data: [{ iso2: 'BR', iso3: 'BRA', country: 'Brazil', cities: [] }],
        }),
      );
    });

    const response = await request(app.getHttpServer())
      .get('/api/v1/countriesnow/cities/search?country=Brazil&q=campo')
      .expect(200);

    expect(response.body).toEqual([
      { city: 'Campo Grande', state: 'Alagoas' },
      { city: 'Campo Grande', state: 'Mato Grosso do Sul' },
    ]);
  });
});
