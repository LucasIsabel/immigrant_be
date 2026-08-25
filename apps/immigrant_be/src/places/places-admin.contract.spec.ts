// O `@Session()` arrasta o better-auth (ESM) para dentro do Jest. O mock usa o
// `createParamDecorator` de verdade do Nest para não mentir sobre o metadata —
// é justamente o metadata que o Swagger lê.
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
  PlaceCategory: { LANDMARK: 'LANDMARK', MUSEUM: 'MUSEUM' },
}));

import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { Test } from '@nestjs/testing';
import { PlacesAdminController } from './places-admin.controller';
import { PlacesAdminService } from './places-admin.service';

/**
 * O contrato com o frontend, verificado — não confiado.
 *
 * O FE gera hooks e tipos a partir deste OpenAPI. Uma resposta declarada como
 * schema inline em vez de classe nomeada compila, sobe e responde certo: só
 * não vira tipo do outro lado, e a falha só aparece no `pnpm generate:api`
 * dias depois. Foi assim que #132 e #133 viraram retrabalho.
 *
 * Este spec falha na hora em que alguém acrescenta uma rota sem `type`.
 */
describe('Contrato OpenAPI — Places Admin', () => {
  let app: INestApplication;
  let document: OpenAPIObject;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [PlacesAdminController],
      providers: [{ provide: PlacesAdminService, useValue: {} }],
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

  const respostasComCorpo = () =>
    Object.entries(document.paths).flatMap(([rota, item]) =>
      Object.entries(item as Record<string, unknown>).flatMap(
        ([metodo, operacao]) => {
          const respostas =
            (operacao as { responses?: Record<string, unknown> }).responses ??
            {};
          return Object.entries(respostas)
            .filter(([codigo]) => codigo.startsWith('2'))
            .map(([codigo, resposta]) => ({
              rota: `${metodo.toUpperCase()} ${rota}`,
              codigo,
              schema: (
                resposta as {
                  content?: {
                    'application/json'?: { schema?: Record<string, unknown> };
                  };
                }
              ).content?.['application/json']?.schema,
            }));
        },
      ),
    );

  it('registra as nove operações do fluxo de ingestão', () => {
    const operacoes = Object.entries(document.paths)
      .flatMap(([rota, item]) =>
        Object.keys(item as Record<string, unknown>).map(
          (metodo) => `${metodo.toUpperCase()} ${rota}`,
        ),
      )
      .sort();

    expect(operacoes).toEqual([
      'GET /admin/places/ingestions',
      'GET /admin/places/ingestions/{id}',
      'PATCH /admin/places/ingestions/{id}/places/{placeId}',
      'POST /admin/places/ingestions',
      'POST /admin/places/ingestions/{id}/approve',
      'POST /admin/places/ingestions/{id}/places/{placeId}/reject',
      'POST /admin/places/ingestions/{id}/places/{placeId}/retry-texts',
      'POST /admin/places/ingestions/{id}/reject',
      'POST /admin/places/ingestions/{id}/retry',
    ]);
  });

  it('toda resposta de sucesso com corpo aponta para um schema nomeado', () => {
    const inline = respostasComCorpo()
      .filter((r) => r.schema && !('$ref' in r.schema))
      .map((r) => `${r.rota} (${r.codigo})`);

    expect(inline).toEqual([]);
  });

  it('expõe os DTOs que o frontend precisa gerar', () => {
    const schemas = Object.keys(document.components?.schemas ?? {});

    expect(schemas).toEqual(
      expect.arrayContaining([
        'CityIngestionResponseDto',
        'CityIngestionDetailResponseDto',
        'PaginatedCityIngestionsResponseDto',
        'AdminPlaceResponseDto',
        'IngestionStatsDto',
        'IngestionConflictDto',
        'PlaceRejectionDto',
      ]),
    );
  });

  it('não deixa os tipos aninhados como schema inline', () => {
    // `$ref` dentro de schema inline exigiria `@ApiExtraModels` e sairia como
    // `any` no frontend — foi exatamente o buraco do #133.
    const stats = document.components?.schemas?.[
      'CityIngestionResponseDto'
    ] as { properties?: Record<string, { allOf?: unknown[]; $ref?: string }> };

    const propriedade = stats.properties?.stats;
    const referencia =
      propriedade?.$ref ??
      (propriedade?.allOf?.[0] as { $ref?: string } | undefined)?.$ref;

    expect(referencia).toBe('#/components/schemas/IngestionStatsDto');
  });
});
