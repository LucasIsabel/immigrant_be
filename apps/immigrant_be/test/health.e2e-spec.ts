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
import {
  REDIS_HEALTH_CLIENT,
  RedisHealthIndicator,
} from '../src/health/redis-health.indicator';
import { AllExceptionsFilter } from '../src/common/filters/all-exceptions.filter';

/**
 * Exercises the health surface over real HTTP with the same global prefix,
 * pipes and filters as main.ts, so a regression in the bootstrap wiring or in
 * the readiness probe shows up here instead of in production.
 */
describe('Health (e2e)', () => {
  let app: INestApplication;
  const queryRaw = jest.fn();
  const ping = jest.fn();

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TerminusModule],
      controllers: [HealthController],
      providers: [
        PrismaHealthIndicator,
        RedisHealthIndicator,
        { provide: PrismaService, useValue: { $queryRaw: queryRaw } },
        { provide: REDIS_HEALTH_CLIENT, useValue: { ping, quit: jest.fn() } },
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
    queryRaw.mockResolvedValue([{ '?column?': 1 }]);
    ping.mockResolvedValue('PONG');
  });

  it('serves health under the /api/v1 prefix', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/v1/health')
      .expect(200);

    expect(response.body.status).toBe('ok');
  });

  it('does not expose health outside the global prefix', async () => {
    await request(app.getHttpServer()).get('/health').expect(404);
  });

  it('checks both dependencies on /health', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/v1/health')
      .expect(200);

    expect(response.body.info).toEqual({
      database: { status: 'up' },
      redis: { status: 'up' },
    });
    expect(queryRaw).toHaveBeenCalled();
    expect(ping).toHaveBeenCalled();
  });

  it('reports ready when both dependencies answer', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/v1/health/ready')
      .expect(200);

    expect(response.body.status).toBe('ok');
    expect(response.body.info.database.status).toBe('up');
    expect(response.body.info.redis.status).toBe('up');
  });

  /**
   * The point of the whole endpoint: a degraded response has to say *which*
   * dependency is down. The filter used to flatten this into a generic message,
   * which left an operator with a 503 and no reason.
   */
  it('reports 503 naming the database when it is unreachable', async () => {
    queryRaw.mockRejectedValue(new Error('connection refused'));

    const response = await request(app.getHttpServer())
      .get('/api/v1/health')
      .expect(503);

    expect(response.body.status).toBe('error');
    expect(response.body.error.database.status).toBe('down');
    expect(response.body.details.redis.status).toBe('up');
  });

  it('reports 503 naming redis when it is unreachable', async () => {
    ping.mockRejectedValue(new Error('ECONNREFUSED'));

    const response = await request(app.getHttpServer())
      .get('/api/v1/health')
      .expect(503);

    expect(response.body.status).toBe('error');
    expect(response.body.error.redis.status).toBe('down');
    expect(response.body.details.database.status).toBe('up');
  });

  it('reports both as down when everything is unreachable', async () => {
    queryRaw.mockRejectedValue(new Error('connection refused'));
    ping.mockRejectedValue(new Error('ECONNREFUSED'));

    const response = await request(app.getHttpServer())
      .get('/api/v1/health')
      .expect(503);

    expect(response.body.error).toEqual({
      database: { status: 'down' },
      redis: { status: 'down' },
    });
  });

  /**
   * Liveness must never depend on Postgres or Redis: a container health check
   * pointed at a dependency-aware endpoint turns an outage into a restart loop.
   */
  it('keeps liveness green while every dependency is down', async () => {
    queryRaw.mockRejectedValue(new Error('connection refused'));
    ping.mockRejectedValue(new Error('ECONNREFUSED'));

    const response = await request(app.getHttpServer())
      .get('/api/v1/health/live')
      .expect(200);

    expect(response.body.status).toBe('ok');
    expect(queryRaw).not.toHaveBeenCalled();
    expect(ping).not.toHaveBeenCalled();
  });
});
