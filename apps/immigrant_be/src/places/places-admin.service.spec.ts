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
  PlaceCategory: { LANDMARK: 'LANDMARK' },
}));

import {
  ConflictException,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import type { IngestionDispatcher } from '@app/ingestion';
import { PlacesAdminRepository } from './places-admin.repository';
import { PlacesAdminService } from './places-admin.service';

const ADMIN_ID = 'admin-1';
const INGESTION_ID = '11111111-1111-4111-8111-111111111111';
const PLACE_ID = '22222222-2222-4222-8222-222222222222';

const ingestion = (over: Record<string, unknown> = {}) => ({
  id: INGESTION_ID,
  countryCode: 'PT',
  city: 'Lisbon',
  status: 'READY_FOR_REVIEW',
  step: null,
  errorMessage: null,
  osmAreaId: null,
  osmMatchedName: null,
  stats: null,
  createdAt: new Date('2026-08-25T12:00:00Z'),
  updatedAt: new Date('2026-08-25T12:00:00Z'),
  ...over,
});

const place = (over: Record<string, unknown> = {}) => ({
  id: PLACE_ID,
  name: 'Torre de Belém',
  slug: 'torre-de-belem',
  category: 'LANDMARK',
  reviewStatus: 'DRAFT',
  isActive: false,
  lat: 38.69,
  lng: -9.21,
  isFree: false,
  popularityScore: 100,
  address: null,
  website: null,
  sourceUrl: 'https://www.openstreetmap.org/way/1',
  wikidataId: 'Q215003',
  wikipediaMonthlyViews: 12997,
  generatedByModel: 'gemini-flash',
  generationCostUsd: { toNumber: () => 0.0002 },
  translations: [],
  ...over,
});

describe('PlacesAdminService', () => {
  // Tipo estrutural, e não `jest.Mocked<PlacesAdminRepository>`: o ESLint
  // enxerga método de classe dentro de um `expect` como referência unbound.
  let repository: Record<string, jest.Mock>;
  let dispatcher: { dispatchCity: jest.Mock; dispatchPlaceTexts: jest.Mock };
  let service: PlacesAdminService;

  beforeEach(() => {
    repository = {
      findActiveForCity: jest.fn().mockResolvedValue(null),
      create: jest.fn().mockImplementation(() => Promise.resolve(ingestion())),
      list: jest.fn(),
      findById: jest.fn().mockResolvedValue(ingestion()),
      findDetail: jest.fn(),
      findPlaceInIngestion: jest.fn().mockResolvedValue(place()),
      updatePlace: jest.fn().mockResolvedValue(place()),
      rejectPlace: jest
        .fn()
        .mockResolvedValue(place({ reviewStatus: 'REJECTED' })),
      recordPlaceRejection: jest.fn().mockResolvedValue(1),
      findDraftsMissingTexts: jest.fn().mockResolvedValue([]),
      approve: jest.fn().mockResolvedValue({
        ingestion: ingestion({ status: 'APPROVED' }),
        published: 10,
      }),
      reject: jest.fn().mockResolvedValue(ingestion({ status: 'REJECTED' })),
      reopen: jest.fn().mockResolvedValue(ingestion({ status: 'PROCESSING' })),
    };

    dispatcher = {
      dispatchCity: jest.fn().mockResolvedValue(undefined),
      dispatchPlaceTexts: jest.fn().mockResolvedValue(undefined),
    };

    service = new PlacesAdminService(
      repository as unknown as PlacesAdminRepository,
      dispatcher as IngestionDispatcher,
    );
  });

  describe('createIngestion', () => {
    it('cria e enfileira a cidade', async () => {
      await service.createIngestion(
        { countryCode: 'PT', city: 'Lisbon' },
        ADMIN_ID,
      );

      expect(dispatcher.dispatchCity).toHaveBeenCalledWith(INGESTION_ID);
    });

    it('recusa uma segunda ingestão da mesma cidade em andamento', async () => {
      // Duas ao mesmo tempo disputariam os mesmos slugs.
      repository.findActiveForCity.mockResolvedValue({
        id: 'outra',
        status: 'PROCESSING',
      } as never);

      await expect(
        service.createIngestion(
          { countryCode: 'PT', city: 'Lisbon' },
          ADMIN_ID,
        ),
      ).rejects.toThrow(ConflictException);
      expect(dispatcher.dispatchCity).not.toHaveBeenCalled();
    });

    it('devolve osmAreaId como string, porque BigInt não serializa', async () => {
      // Sem a conversão a rota devolveria 500 na primeira cidade resolvida.
      repository.create.mockResolvedValue(
        ingestion({ osmAreaId: BigInt(3605400890) }) as never,
      );

      const result = await service.createIngestion(
        { countryCode: 'PT', city: 'Lisbon' },
        ADMIN_ID,
      );

      expect(result.osmAreaId).toBe('3605400890');
      expect(() => JSON.stringify(result)).not.toThrow();
    });
  });

  describe('approve', () => {
    it('publica os rascunhos quando todos têm as três traduções', async () => {
      const result = await service.approve(INGESTION_ID, ADMIN_ID);

      expect(repository.approve).toHaveBeenCalledWith(INGESTION_ID, ADMIN_ID);
      expect(result.status).toBe('APPROVED');
    });

    it('recusa com 422 e lista quem está sem tradução', async () => {
      // Aprovar em silêncio publicaria um card mudo em espanhol.
      repository.findDraftsMissingTexts.mockResolvedValue([
        { id: PLACE_ID, name: 'Torre de Belém', slug: 'torre-de-belem' },
      ]);

      await expect(service.approve(INGESTION_ID, ADMIN_ID)).rejects.toThrow(
        UnprocessableEntityException,
      );
      expect(repository.approve).not.toHaveBeenCalled();
    });

    it('só decide cidade que está pronta para revisão', async () => {
      repository.findById.mockResolvedValue(
        ingestion({ status: 'PROCESSING' }) as never,
      );

      await expect(service.approve(INGESTION_ID, ADMIN_ID)).rejects.toThrow(
        ConflictException,
      );
    });
  });

  describe('updatePlace', () => {
    it('não edita lugar que já saiu do rascunho', async () => {
      // Editar um lugar publicado por esta tela seria mexer em produção sem trilha.
      repository.findPlaceInIngestion.mockResolvedValue(
        place({ reviewStatus: 'APPROVED' }) as never,
      );

      await expect(
        service.updatePlace(INGESTION_ID, PLACE_ID, { name: 'Outro' }),
      ).rejects.toThrow(ConflictException);
    });

    it('404 quando o lugar não é desta ingestão', async () => {
      repository.findPlaceInIngestion.mockResolvedValue(null as never);

      await expect(
        service.updatePlace(INGESTION_ID, PLACE_ID, { name: 'Outro' }),
      ).rejects.toThrow(NotFoundException);
    });

    it('converte o Decimal do custo em número', async () => {
      const result = await service.updatePlace(INGESTION_ID, PLACE_ID, {});

      expect(result.generationCostUsd).toBe(0.0002);
    });
  });

  describe('rejectPlace', () => {
    it('guarda o motivo em vez de descartá-lo', async () => {
      await service.rejectPlace(INGESTION_ID, PLACE_ID, 'É bairro residencial');

      expect(repository.recordPlaceRejection).toHaveBeenCalledWith(
        INGESTION_ID,
        PLACE_ID,
        'É bairro residencial',
      );
    });

    it('aceita recusa sem motivo', async () => {
      await service.rejectPlace(INGESTION_ID, PLACE_ID);

      expect(repository.recordPlaceRejection).not.toHaveBeenCalled();
      expect(repository.rejectPlace).toHaveBeenCalledWith(PLACE_ID);
    });
  });

  describe('retry', () => {
    it('reenfileira sem descartar a área já resolvida', async () => {
      // Resolver custa até quatro consultas ao Overpass mais uma sonda.
      repository.findById.mockResolvedValue(
        ingestion({ status: 'FAILED', osmAreaId: BigInt(3605400893) }) as never,
      );

      await service.retry(INGESTION_ID);

      expect(repository.reopen).toHaveBeenCalledWith(INGESTION_ID);
      expect(dispatcher.dispatchCity).toHaveBeenCalledWith(INGESTION_ID);
    });

    it('só reprocessa ingestão em FAILED', async () => {
      await expect(service.retry(INGESTION_ID)).rejects.toThrow(
        ConflictException,
      );
      expect(dispatcher.dispatchCity).not.toHaveBeenCalled();
    });
  });
});
