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
import { ItinerariesAdminController } from './itineraries-admin.controller';
import { ItinerariesController } from './itineraries.controller';
import { ItinerariesService } from './itineraries.service';

/**
 * The contract with the frontend, verified rather than trusted.
 *
 * The frontend generates its hooks and types from this OpenAPI. A response
 * declared as an inline schema instead of a named class compiles, boots and
 * answers correctly: it just produces no type on the other side, and the
 * failure only surfaces at `pnpm generate:api`, days later.
 */
describe('OpenAPI contract — Itineraries', () => {
  let app: INestApplication;
  let document: OpenAPIObject;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [ItinerariesController, ItinerariesAdminController],
      providers: [{ provide: ItinerariesService, useValue: {} }],
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

  it('registers every operation of the itineraries flow', () => {
    expect(operations()).toEqual([
      'DELETE /itineraries/{id}',
      'DELETE /itineraries/{id}/stops/{stopId}',
      'GET /admin/itineraries/reported',
      'GET /itineraries/mine',
      'GET /itineraries/public',
      'GET /itineraries/public/{slug}',
      'GET /itineraries/{id}',
      'PATCH /itineraries/{id}',
      'PATCH /itineraries/{id}/visibility',
      'POST /admin/itineraries/{id}/dismiss-reports',
      'POST /admin/itineraries/{id}/unpublish',
      'POST /itineraries',
      'POST /itineraries/public/{slug}/copy',
      'POST /itineraries/public/{slug}/report',
      'POST /itineraries/stops',
      'PUT /itineraries/{id}/stops/order',
    ]);
  });

  /**
   * Declaration order is routing order. `mine` and `stops` are literal segments
   * that Express would otherwise hand to `:id`, and the symptom is a route that
   * exists answering "not found" for a uuid it never saw.
   */
  it('declares the literal routes before the parameterised one', () => {
    const declared = Object.keys(document.paths);
    const indexOf = (route: string) => declared.indexOf(route);

    expect(indexOf('/itineraries/mine')).toBeLessThan(
      indexOf('/itineraries/{id}'),
    );
    expect(indexOf('/itineraries/stops')).toBeLessThan(
      indexOf('/itineraries/{id}'),
    );

    // `public` would otherwise be read as a slug by `public/{slug}`, and as an
    // id by `{id}`.
    expect(indexOf('/itineraries/public')).toBeLessThan(
      indexOf('/itineraries/public/{slug}'),
    );

    // The collection itself carries no segment, so `:id` can never swallow it
    // — but if it ever moved below, POST and GET on `/itineraries` would be
    // declared apart, which is the shape that hides a routing mistake.
    expect(indexOf('/itineraries')).toBeLessThan(indexOf('/itineraries/{id}'));
    expect(indexOf('/itineraries/public')).toBeLessThan(
      indexOf('/itineraries/{id}'),
    );
  });

  /*
   * Reports were written from the day the button shipped and never read once:
   * no queue, no count, no screen. These three routes are what makes the
   * report dialog's "received" true, and they are the only place in this API
   * that reaches an itinerary without its owner — so the contract is where the
   * guard gets checked.
   */
  it('asks for an admin on every route that reaches somebody else’s itinerary', () => {
    const paths = document.paths as Record<
      string,
      Record<string, { security?: unknown[] }>
    >;

    const admin = Object.entries(paths)
      .filter(([route]) => route.startsWith('/admin/'))
      .flatMap(([, item]) => Object.values(item));

    expect(admin).toHaveLength(3);
    for (const operation of admin) {
      expect(operation.security).toEqual([{ 'better-auth.session_token': [] }]);
    }
  });

  /*
   * The copy route sits among the anonymous ones because it is addressed by
   * the public slug. That placement is a readability choice and grants nothing
   * — the guard does — so the contract is where it gets checked: this asserts
   * the route declares the session cookie its neighbours in the public block
   * deliberately do not.
   */
  it('keeps the copy route authenticated, unlike the public block it sits in', () => {
    const paths = document.paths as Record<
      string,
      Record<string, { security?: unknown[] }>
    >;

    const copy = paths['/itineraries/public/{slug}/copy'].post;
    const report = paths['/itineraries/public/{slug}/report'].post;
    const detail = paths['/itineraries/public/{slug}'].get;

    expect(copy.security).toEqual([{ 'better-auth.session_token': [] }]);
    expect(report.security).toBeUndefined();
    expect(detail.security).toBeUndefined();
  });

  /*
   * The 409 on the copy route is a question, not a failure: the frontend reads
   * its body to decide what the confirmation dialog says. An inline schema
   * compiles and answers correctly and lands as `any` on the other side, which
   * is exactly where that dialog would start guessing at field names.
   */
  it('names the schema of the copy conflict, because the client reads it', () => {
    const paths = document.paths as Record<
      string,
      Record<
        string,
        {
          responses?: Record<
            string,
            {
              content?: { 'application/json'?: { schema?: { $ref?: string } } };
            }
          >;
        }
      >
    >;

    const conflito =
      paths['/itineraries/public/{slug}/copy'].post.responses?.['409'];
    const schema = conflito?.content?.['application/json']?.schema;

    expect(schema?.$ref).toBe('#/components/schemas/CopyItineraryConflictDto');
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
              // No body at all is fine — 204 on delete says everything it has
              // to say. A body described inline is not.
              return schema !== undefined && !('$ref' in schema);
            })
            .map(([code]) => `${method.toUpperCase()} ${route} → ${code}`);
        },
      ),
    );

    expect(inline).toEqual([]);
  });
});
