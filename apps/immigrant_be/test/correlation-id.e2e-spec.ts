/**
 * `@app/config/env` parses `process.env` at import time and would reject the
 * bare Jest environment. The values below are the ones the logger actually
 * reads; `production` keeps pino emitting plain JSON, which is what a log
 * collector receives and therefore what this test should assert on.
 */
jest.mock('@app/config/env', () => ({
  env: { NODE_ENV: 'production', LOG_LEVEL: 'info' },
}));

jest.mock('@thallesp/nestjs-better-auth', () => ({
  AllowAnonymous: () => () => undefined,
  Session: () => () => undefined,
  AuthGuard: class AuthGuard {},
}));

import { Controller, Get, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { LoggerModule, PinoLogger } from 'nestjs-pino';
import request from 'supertest';
import { buildPinoOptions } from '@app/config/logger';
import { getCorrelationId } from '@app/config/request-context';
import { correlationIdMiddleware } from '../src/common/middleware/correlation-id.middleware';

const lines: string[] = [];

/** Collects everything pino writes so the log output can be asserted on. */
const collector = {
  write(line: string) {
    lines.push(line);
  },
};

@Controller('trace')
class TraceController {
  constructor(private readonly logger: PinoLogger) {}

  @Get()
  handle() {
    // A log emitted from inside a service, with nothing threaded through.
    this.logger.info('handled the request');
    return { correlationId: getCorrelationId() };
  }
}

/**
 * Proves the end-to-end claim of the observability work: one request produces
 * a log line carrying its correlation ID, and the caller gets that same ID back
 * so they can quote it.
 */
describe('Correlation ID (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const options = buildPinoOptions('test-app');

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        LoggerModule.forRoot({
          pinoHttp: [options.pinoHttp as object, collector],
        }),
      ],
      controllers: [TraceController],
    }).compile();

    app = moduleFixture.createNestApplication({ bufferLogs: true });
    app.use(correlationIdMiddleware);
    app.setGlobalPrefix('api/v1');
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(() => {
    lines.length = 0;
  });

  function loggedCorrelationIds(): string[] {
    return lines
      .map((line) => JSON.parse(line) as { correlationId?: string })
      .map((entry) => entry.correlationId)
      .filter((id): id is string => Boolean(id));
  }

  it('reuses an inbound x-request-id and echoes it back', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/v1/trace')
      .set('x-request-id', 'from-the-frontend')
      .expect(200);

    expect(response.headers['x-request-id']).toBe('from-the-frontend');
    expect(response.body.correlationId).toBe('from-the-frontend');
  });

  it('puts the inbound id on the log line the handler emits', async () => {
    await request(app.getHttpServer())
      .get('/api/v1/trace')
      .set('x-request-id', 'traceable-123')
      .expect(200);

    expect(loggedCorrelationIds()).toContain('traceable-123');
  });

  it('generates an id when the caller sends none', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/v1/trace')
      .expect(200);

    const generated = response.headers['x-request-id'];
    expect(generated).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/,
    );
    expect(response.body.correlationId).toBe(generated);
    expect(loggedCorrelationIds()).toContain(generated);
  });

  it('gives concurrent requests distinct ids', async () => {
    const [first, second] = await Promise.all([
      request(app.getHttpServer()).get('/api/v1/trace').expect(200),
      request(app.getHttpServer()).get('/api/v1/trace').expect(200),
    ]);

    expect(first.body.correlationId).not.toBe(second.body.correlationId);
  });

  it('stamps the application name on every log line', () => {
    const options = buildPinoOptions('test-app');

    expect((options.pinoHttp as { base: unknown }).base).toEqual({
      app: 'test-app',
    });
  });
});
