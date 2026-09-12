// `@Session()` drags better-auth (ESM) into Jest. The mock uses Nest's real
// `createParamDecorator` so it does not lie about the metadata — the metadata
// is precisely what Swagger reads.
jest.mock('@thallesp/nestjs-better-auth', () => {
  const { createParamDecorator } =
    jest.requireActual<typeof import('@nestjs/common')>('@nestjs/common');
  return {
    Session: createParamDecorator(() => ({ user: { id: 'admin-1' } })),
  };
});

jest.mock('@app/database', () => ({
  PrismaService: jest.fn(),
  DatabaseModule: jest.fn(),
}));

jest.mock('../../../../generated/prisma', () => ({
  CityIngestionStatus: {
    PROCESSING: 'PROCESSING',
    FAILED: 'FAILED',
    READY_FOR_REVIEW: 'READY_FOR_REVIEW',
    APPROVED: 'APPROVED',
    REJECTED: 'REJECTED',
  },
  PlaceReviewStatus: {
    DRAFT: 'DRAFT',
    APPROVED: 'APPROVED',
    REJECTED: 'REJECTED',
  },
  PlaceCategory: { LANDMARK: 'LANDMARK', MUSEUM: 'MUSEUM', BEACH: 'BEACH' },
  // Read at import time by the decorators of `CreateCityIngestionDto`: this
  // factory replaces the module whole, so a missing enum is a suite that
  // cannot even load.
  CityIngestionScope: { CITY: 'CITY', COUNTRY: 'COUNTRY' },
}));

import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { Test } from '@nestjs/testing';
import { PlacesAdminController } from './places-admin.controller';
import { PlacesAdminService } from './places-admin.service';
import { PlacesCatalogAdminController } from './places-catalog-admin.controller';
import { PlacesCatalogAdminService } from './places-catalog-admin.service';

/**
 * The contract with the frontend, verified rather than trusted.
 *
 * The frontend generates hooks and types from this OpenAPI. A response declared
 * as an inline schema instead of a named class compiles, boots and answers
 * correctly: it just produces no type on the other side, and the failure only
 * shows up at `pnpm generate:api` days later. That is how #132 and #133 became
 * rework.
 *
 * This spec fails the moment somebody adds a route without a `type`.
 */
describe('OpenAPI contract — Places Admin', () => {
  let app: INestApplication;
  let document: OpenAPIObject;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [PlacesAdminController, PlacesCatalogAdminController],
      providers: [
        { provide: PlacesAdminService, useValue: {} },
        { provide: PlacesCatalogAdminService, useValue: {} },
      ],
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

  it('registers the fourteen operations of the ingestion and catalogue flows', () => {
    const operations = Object.entries(document.paths)
      .flatMap(([route, item]) =>
        Object.keys(item as Record<string, unknown>).map(
          (method) => `${method.toUpperCase()} ${route}`,
        ),
      )
      .sort();

    expect(operations).toEqual([
      'DELETE /admin/places/{id}',
      'GET /admin/places',
      'GET /admin/places/ingestions',
      'GET /admin/places/ingestions/{id}',
      'PATCH /admin/places/ingestions/{id}/places/{placeId}',
      'PATCH /admin/places/{id}',
      'POST /admin/places/ingestions',
      'POST /admin/places/ingestions/{id}/approve',
      'POST /admin/places/ingestions/{id}/places/{placeId}/reject',
      'POST /admin/places/ingestions/{id}/places/{placeId}/retry-texts',
      'POST /admin/places/ingestions/{id}/reject',
      'POST /admin/places/ingestions/{id}/retry',
      'POST /admin/places/{id}/activate',
      'POST /admin/places/{id}/deactivate',
    ]);
  });

  it('says in the contract that a sweep has no city', () => {
    // The admin screens read `city`, and a country sweep has none (#220). The
    // frontend learns it here, when it regenerates the client, instead of from
    // a cell that renders empty and explains nothing.
    const schemas = (document.components?.schemas ?? {}) as Record<
      string,
      { properties?: Record<string, unknown>; required?: string[] }
    >;

    expect(schemas.CreateCityIngestionDto.required ?? []).not.toContain('city');
    expect(schemas.CreateCityIngestionDto.properties).toHaveProperty('scope');
    expect(schemas.CreateCityIngestionDto.properties).toHaveProperty(
      'categories',
    );

    expect(schemas.CityIngestionResponseDto.required ?? []).not.toContain(
      'city',
    );
    expect(schemas.CityIngestionResponseDto.required ?? []).toEqual(
      expect.arrayContaining(['scope', 'categories']),
    );
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
        'CityIngestionResponseDto',
        'CityIngestionDetailResponseDto',
        'PaginatedCityIngestionsResponseDto',
        'AdminPlaceResponseDto',
        'ReviewPlaceResponseDto',
        'IngestionStatsDto',
        'IngestionConflictDto',
        'PlaceRejectionDto',
        // Query DTOs flatten into parameters and never become components —
        // only bodies and responses are asserted here.
        'PaginatedCatalogPlacesResponseDto',
        'UpdateCatalogPlaceDto',
      ]),
    );
  });

  it('gives the review screen the place shape that carries the text status', () => {
    // The detail is the only response that says where a text stands, and the
    // frontend can only tell "failed" from "still writing" if this `$ref`
    // points at the richer DTO rather than at the plain admin one.
    const detail = document.components?.schemas?.[
      'CityIngestionDetailResponseDto'
    ] as { properties?: Record<string, { items?: { $ref?: string } }> };

    expect(detail.properties?.places?.items?.$ref).toBe(
      '#/components/schemas/ReviewPlaceResponseDto',
    );

    const review = document.components?.schemas?.['ReviewPlaceResponseDto'] as {
      properties?: Record<string, { enum?: string[] }>;
    };
    expect(review.properties?.textsStatus?.enum).toEqual(
      expect.arrayContaining(['WRITTEN', 'PENDING', 'FAILED', 'INCOMPLETE']),
    );
  });

  it('does not leave the nested types as inline schemas', () => {
    // A `$ref` inside an inline schema would need `@ApiExtraModels` and would
    // land as `any` on the frontend — exactly the hole in #133.
    const stats = document.components?.schemas?.[
      'CityIngestionResponseDto'
    ] as { properties?: Record<string, { allOf?: unknown[]; $ref?: string }> };

    const property = stats.properties?.stats;
    const reference =
      property?.$ref ??
      (property?.allOf?.[0] as { $ref?: string } | undefined)?.$ref;

    expect(reference).toBe('#/components/schemas/IngestionStatsDto');
  });
});
