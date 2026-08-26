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

jest.mock('../../../../generated/prisma', () => ({
  CommunityEventStatus: {
    DRAFT: 'DRAFT',
    PENDING_REVIEW: 'PENDING_REVIEW',
    APPROVED: 'APPROVED',
    REJECTED: 'REJECTED',
    CANCELLED: 'CANCELLED',
  },
  CommunityEventCategory: {
    CONCERT: 'CONCERT',
    FAIR: 'FAIR',
    MEETUP: 'MEETUP',
    WORKSHOP: 'WORKSHOP',
    EXHIBITION: 'EXHIBITION',
    SPORTS: 'SPORTS',
    FOOD: 'FOOD',
    OTHER: 'OTHER',
  },
}));

import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { Test } from '@nestjs/testing';
import { CommunityEventsController } from './community-events.controller';
import { CommunityEventsAdminController } from './community-events-admin.controller';
import { CommunityEventsService } from './community-events.service';

/**
 * The contract with the frontend, verified rather than trusted.
 *
 * The frontend generates hooks and types from this OpenAPI. A response declared
 * as an inline schema instead of a named class compiles, boots and answers
 * correctly: it just produces no type on the other side, and the failure only
 * shows up at `pnpm generate:api` days later.
 *
 * This spec fails the moment somebody adds a route without a `type`.
 */
describe('OpenAPI contract — Community Events', () => {
  let app: INestApplication;
  let document: OpenAPIObject;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [CommunityEventsController, CommunityEventsAdminController],
      providers: [{ provide: CommunityEventsService, useValue: {} }],
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

  const responsesWithBody = () =>
    Object.entries(document.paths).flatMap(([route, item]) =>
      Object.entries(item as Record<string, unknown>).flatMap(
        ([method, operation]) => {
          const responses =
            (operation as { responses?: Record<string, unknown> }).responses ??
            {};
          return Object.entries(responses)
            .filter(([code]) => code.startsWith('2'))
            .map(([code, response]) => ({
              route: `${method.toUpperCase()} ${route}`,
              code,
              schema: (
                response as {
                  content?: {
                    'application/json'?: { schema?: Record<string, unknown> };
                  };
                }
              ).content?.['application/json']?.schema,
            }));
        },
      ),
    );

  it('registers the fourteen operations of the community events flow', () => {
    const operations = Object.entries(document.paths)
      .flatMap(([route, item]) =>
        Object.keys(item as Record<string, unknown>).map(
          (method) => `${method.toUpperCase()} ${route}`,
        ),
      )
      .sort();

    expect(operations).toEqual([
      'GET /admin/events',
      'GET /admin/events/{id}',
      'GET /events/mine',
      'GET /events/public',
      'GET /events/public/{slug}',
      'GET /events/{id}',
      'PATCH /events/{id}',
      'POST /admin/events/{id}/approve',
      'POST /admin/events/{id}/reject',
      'POST /events',
      'POST /events/public/{slug}/report',
      'POST /events/{id}/cancel',
      'POST /events/{id}/image',
      'POST /events/{id}/submit',
    ]);
  });

  it('points every success response with a body at a named schema', () => {
    const inline = responsesWithBody()
      .filter((r) => r.schema && !('$ref' in r.schema))
      .map((r) => `${r.route} (${r.code})`);

    expect(inline).toEqual([]);
  });

  it('exposes the DTOs the frontend needs to generate', () => {
    const schemas = Object.keys(document.components?.schemas ?? {});

    expect(schemas).toEqual(
      expect.arrayContaining([
        'CreateCommunityEventDto',
        'UpdateCommunityEventDto',
        'RejectCommunityEventDto',
        'ReportCommunityEventDto',
        'CommunityEventResponseDto',
        'CommunityEventReportDto',
        'PaginatedCommunityEventsResponseDto',
        'PublicCommunityEventDto',
        'CommunityEventVenueDto',
        'PaginatedPublicCommunityEventsResponseDto',
        'UploadEventImageResponseDto',
        'ReportCommunityEventResponseDto',
        // Query DTOs flatten into parameters and never become components —
        // only bodies and responses are asserted here.
      ]),
    );
  });

  it('does not leave the nested types as inline schemas', () => {
    // A `$ref` inside an inline schema would need `@ApiExtraModels` and would
    // land as `any` on the frontend.
    const publicEvent = document.components?.schemas?.[
      'PublicCommunityEventDto'
    ] as {
      properties?: Record<string, { allOf?: unknown[]; $ref?: string }>;
    };

    const venue = publicEvent.properties?.venue;
    const reference =
      venue?.$ref ?? (venue?.allOf?.[0] as { $ref?: string } | undefined)?.$ref;

    expect(reference).toBe('#/components/schemas/CommunityEventVenueDto');
  });

  it('keeps the public routes anonymous and the rest behind the session cookie', () => {
    const secured = Object.entries(document.paths).flatMap(([route, item]) =>
      Object.entries(item as Record<string, unknown>)
        .filter(
          ([, operation]) =>
            ((operation as { security?: unknown[] }).security ?? []).length > 0,
        )
        .map(([method]) => `${method.toUpperCase()} ${route}`),
    );

    expect(secured.sort()).toEqual([
      'GET /admin/events',
      'GET /admin/events/{id}',
      'GET /events/mine',
      'GET /events/{id}',
      'PATCH /events/{id}',
      'POST /admin/events/{id}/approve',
      'POST /admin/events/{id}/reject',
      'POST /events',
      'POST /events/{id}/cancel',
      'POST /events/{id}/image',
      'POST /events/{id}/submit',
    ]);
  });
});
