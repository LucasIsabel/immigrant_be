/**
 * `@app/database` re-exports DatabaseModule, which imports AppConfigModule and
 * therefore drags better-auth (ESM) into the Jest runtime. Stubbing the barrel
 * keeps the HTTP layer under test real while avoiding that transitive load.
 * See docs/ARCHITECTURE.md — decoupling libs/database from the auth wiring is
 * what would allow booting the full AppModule here.
 */
jest.mock('@app/database', () => ({
  PrismaService: class PrismaService {},
  DatabaseModule: class DatabaseModule {},
}));

/**
 * The better-auth wrapper pulls in `@noble/ciphers`, which ships pure ESM and
 * cannot be loaded by the CommonJS Jest runtime. Controllers only use it for
 * the `@AllowAnonymous()` marker, so a no-op decorator is enough here — the
 * same approach used by roles.guard.spec.ts.
 */
jest.mock('@thallesp/nestjs-better-auth', () => ({
  AllowAnonymous: () => () => undefined,
  Session: () => () => undefined,
  AuthGuard: class AuthGuard {},
}));

import { INestApplication, ValidationPipe } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '@app/database';
import request from 'supertest';
import { HealthController } from '../src/health/health.controller';
import { PrismaHealthIndicator } from '../src/health/prisma-health.indicator';
import { AllExceptionsFilter } from '../src/common/filters/all-exceptions.filter';

/**
 * Exercises the health surface over real HTTP with the same global prefix,
 * pipes and filters as main.ts, so a regression in the bootstrap wiring or in
 * the readiness probe shows up here instead of in production.
 */
describe('Health (e2e)', () => {
  let app: INestApplication;
  const queryRaw = jest.fn();

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TerminusModule],
      controllers: [HealthController],
      providers: [
        PrismaHealthIndicator,
        { provide: PrismaService, useValue: { $queryRaw: queryRaw } },
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

  it('serves liveness under the /api/v1 prefix', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/v1/health')
      .expect(200);

    expect(response.body.status).toBe('ok');
  });

  it('does not expose health outside the global prefix', async () => {
    await request(app.getHttpServer()).get('/health').expect(404);
  });

  it('reports ready when the database answers', async () => {
    queryRaw.mockResolvedValue([{ '?column?': 1 }]);

    const response = await request(app.getHttpServer())
      .get('/api/v1/health/ready')
      .expect(200);

    expect(response.body.status).toBe('ok');
    expect(response.body.info.database.status).toBe('up');
    expect(queryRaw).toHaveBeenCalled();
  });

  it('reports 503 when the database is unreachable', async () => {
    queryRaw.mockRejectedValue(new Error('connection refused'));

    const response = await request(app.getHttpServer())
      .get('/api/v1/health/ready')
      .expect(503);

    // Documents current behaviour, not desired behaviour: AllExceptionsFilter
    // flattens every error response, so Terminus' per-indicator diagnosis
    // (`{ error: { database: { status: 'down' } } }`) never reaches the caller.
    // The 503 is enough for an orchestrator, but an operator gets no reason.
    // Restoring the diagnosis belongs to the observability work (Epic 3).
    expect(response.body).toMatchObject({
      statusCode: 503,
      message: expect.any(String),
    });
  });
});
