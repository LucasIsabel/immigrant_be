// `@Session()` drags better-auth (ESM) into Jest. The mock uses Nest's real
// `createParamDecorator` so it does not lie about the metadata — the metadata
// is precisely what Swagger reads.
jest.mock('@thallesp/nestjs-better-auth', () => {
  const { createParamDecorator } =
    jest.requireActual<typeof import('@nestjs/common')>('@nestjs/common');
  return {
    Session: createParamDecorator(() => ({ user: { id: 'user-1' } })),
    AllowAnonymous: () => () => undefined,
  };
});

jest.mock('@app/database', () => ({
  PrismaService: jest.fn(),
  DatabaseModule: jest.fn(),
}));

import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { Test } from '@nestjs/testing';
import { NotificationsController } from './notifications.controller';
import { NotificationsInboxService } from './notifications.service';

/**
 * The contract with the frontend, verified rather than trusted.
 *
 * The bell generates its hooks and types from this OpenAPI. A response declared
 * as an inline schema instead of a named class compiles, boots and answers
 * correctly: it just produces no type on the other side, and the failure only
 * surfaces at `pnpm generate:api`, days later.
 */
describe('OpenAPI contract — Notifications', () => {
  let app: INestApplication;
  let document: OpenAPIObject;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [NotificationsController],
      providers: [{ provide: NotificationsInboxService, useValue: {} }],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();

    document = SwaggerModule.createDocument(
      app,
      new DocumentBuilder().setTitle('test').setVersion('1').build(),
    );
  });

  afterAll(async () => {
    await app.close();
  });

  const operations = () =>
    Object.entries(document.paths)
      .flatMap(([route, item]) =>
        Object.keys(item as Record<string, unknown>).map(
          (method) => `${method.toUpperCase()} ${route}`,
        ),
      )
      .sort();

  it('registers every operation of the inbox', () => {
    expect(operations()).toEqual([
      'GET /notifications',
      'GET /notifications/unread-count',
      'PATCH /notifications/{id}/read',
      'POST /notifications/read-all',
    ]);
  });

  /**
   * Declaration order is routing order, and this is the one that bites here.
   * `unread-count` and `read-all` are literal segments that Express would
   * otherwise hand to `:id` — and because `:id` carries a `ParseUUIDPipe`, the
   * symptom would not even be an honest 404: the badge would ask for its count
   * and get a 400 about a malformed uuid it never sent.
   */
  it('declares the literal routes before the parameterised one', () => {
    const declared = Object.keys(document.paths);
    const indexOf = (route: string) => declared.indexOf(route);

    expect(indexOf('/notifications/unread-count')).toBeLessThan(
      indexOf('/notifications/{id}/read'),
    );
    expect(indexOf('/notifications/read-all')).toBeLessThan(
      indexOf('/notifications/{id}/read'),
    );
  });

  it('asks for the session on every route, since none of them is public', () => {
    const paths = document.paths as Record<
      string,
      Record<string, { security?: unknown[] }>
    >;

    const every = Object.values(paths).flatMap((item) => Object.values(item));

    expect(every).not.toHaveLength(0);
    for (const operation of every) {
      expect(operation.security).toEqual([{ 'better-auth.session_token': [] }]);
    }
  });

  /**
   * The transport's bookkeeping stays out of the contract.
   *
   * `userId` is the caller, so echoing it tells them nothing. `status` is
   * whether the SSE poll has despatched the row yet — publish it and a client
   * will eventually reason about it, and then the delivery mechanism cannot
   * change without breaking somebody.
   */
  it('publishes neither the owner nor the delivery state', () => {
    const schema = (
      document.components?.schemas as Record<
        string,
        { properties?: Record<string, unknown> }
      >
    ).NotificationDto;

    expect(Object.keys(schema.properties ?? {}).sort()).toEqual([
      'createdAt',
      'id',
      'message',
      'payload',
      'readAt',
      'title',
      'type',
    ]);
  });

  it('answers every success with a named schema, never an inline one', () => {
    const inline = Object.entries(document.paths).flatMap(([route, item]) =>
      Object.entries(item as Record<string, unknown>).flatMap(
        ([method, operation]) => {
          const responses =
            (operation as { responses?: Record<string, unknown> }).responses ??
            {};
          return Object.entries(responses)
            .filter(([code]) => code.startsWith('2'))
            .filter(([, response]) => {
              const schema = (
                response as {
                  content?: {
                    'application/json'?: { schema?: Record<string, unknown> };
                  };
                }
              ).content?.['application/json']?.schema;
              return schema !== undefined && !('$ref' in schema);
            })
            .map(([code]) => `${method.toUpperCase()} ${route} → ${code}`);
        },
      ),
    );

    expect(inline).toEqual([]);
  });
});
