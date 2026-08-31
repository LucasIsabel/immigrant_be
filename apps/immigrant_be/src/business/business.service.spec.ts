jest.mock('@app/database', () => ({
  PrismaService: jest.fn(),
  DatabaseModule: jest.fn(),
}));

import { Test, TestingModule } from '@nestjs/testing';
import {
  BadRequestException,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { BusinessService } from './business.service';
import { BusinessRepository } from './business.repository';

const mockBusiness = {
  id: 'business-id-1',
  userId: 'user-id-1',
  businessType: 'RESTAURANT',
  name: 'Test Restaurant',
  description: null,
  city: 'Lisboa',
  address: null,
  phone: null,
  website: null,
  email: null,
  isPublic: false,
  typeData: null,
  createdAt: new Date(),
  updatedAt: new Date(),
} as any;

const mockBusinessRepository = {
  create: jest.fn(),
  findAllByUserId: jest.fn(),
  findByIdAndUserId: jest.fn(),
  update: jest.fn(),
  saveDraft: jest.fn(),
  applyDraftAndClearDraft: jest.fn(),
  clearDraft: jest.fn(),
  delete: jest.fn(),
  toggleVisibility: jest.fn(),
  findPublic: jest.fn(),
  findVisibleById: jest.fn(),
};

describe('BusinessService', () => {
  let service: BusinessService;
  let repository: typeof mockBusinessRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BusinessService,
        { provide: BusinessRepository, useValue: mockBusinessRepository },
      ],
    }).compile();

    service = module.get<BusinessService>(BusinessService);
    repository = module.get(BusinessRepository);

    jest.clearAllMocks();
  });

  // ── getMyBusinesses ────────────────────────────────────────

  describe('getMyBusinesses', () => {
    it('should return businesses for userId', async () => {
      repository.findAllByUserId.mockResolvedValue([mockBusiness]);

      const result = await service.getMyBusinesses('user-id-1');

      expect(result).toEqual([mockBusiness]);
    });

    it('should call repository.findAllByUserId with correct userId', async () => {
      repository.findAllByUserId.mockResolvedValue([]);

      await service.getMyBusinesses('user-id-1');

      expect(repository.findAllByUserId).toHaveBeenCalledWith('user-id-1');
    });

    /**
     * Feeds the dashboard's businesses section. An empty list renders as "you
     * have no business yet"; swallowing a database failure here would show that
     * message to an owner who does have one.
     */
    it('propagates a failure of the source instead of returning empty', async () => {
      repository.findAllByUserId.mockRejectedValue(
        new Error('connection refused'),
      );

      await expect(service.getMyBusinesses('user-id-1')).rejects.toThrow(
        'connection refused',
      );
    });
  });

  // ── create ─────────────────────────────────────────────────

  describe('create', () => {
    it('should create a business successfully (no typeData)', async () => {
      repository.create.mockResolvedValue(mockBusiness);

      const dto = {
        businessType: 'RESTAURANT' as any,
        name: 'Test Restaurant',
        city: 'Lisboa',
      };

      const result = await service.create('user-id-1', dto);

      expect(result).toEqual(mockBusiness);
      expect(repository.create).toHaveBeenCalledWith('user-id-1', dto);
    });

    it('should create a business with valid typeData for RESTAURANT type', async () => {
      repository.create.mockResolvedValue(mockBusiness);

      const dto = {
        businessType: 'RESTAURANT' as any,
        name: 'Test Restaurant',
        city: 'Lisboa',
        typeData: { cuisine: 'Italiana', priceRange: '$$' },
      };

      const result = await service.create('user-id-1', dto);

      expect(result).toEqual(mockBusiness);
      expect(repository.create).toHaveBeenCalledWith('user-id-1', dto);
    });

    it('should throw BadRequestException when typeData is invalid for the business type', () => {
      const dto = {
        businessType: 'RESTAURANT' as any,
        name: 'Test Restaurant',
        city: 'Lisboa',
        typeData: { priceRange: 'INVALID' },
      };

      expect(() => service.create('user-id-1', dto)).toThrow(
        BadRequestException,
      );
      expect(repository.create).not.toHaveBeenCalled();
    });

    it('should create TOUR_GUIDE with itinerary containing photo objects', async () => {
      repository.create.mockResolvedValue(mockBusiness);

      const dto = {
        businessType: 'TOUR_GUIDE' as any,
        name: 'Lucas Turismo',
        city: 'Calheta',
        typeData: {
          languages: ['portugues', 'ingles'],
          meetingPoint: 'Aeroporto',
          countryOfOrigin: 'Portugal',
          featured: false,
          profileImage: 'https://example.com/profile.webp',
          itinerary: [
            {
              name: 'Lisboa',
              description: 'lisboa',
              photos: [
                {
                  url: 'https://example.com/photo1.jpg',
                  lat: 38.72,
                  lng: -9.41,
                },
                {
                  url: 'https://example.com/photo2.jpg',
                  lat: 38.7,
                  lng: -9.13,
                },
              ],
            },
          ],
        },
      };

      const result = await service.create('user-id-1', dto);

      expect(result).toEqual(mockBusiness);

      // O dto chega ao repositório com os ids atribuídos, então a comparação é
      // por conteúdo mais `id`, não por identidade com o objeto original.
      const saved = repository.create.mock.calls[0][1];
      expect(saved).toMatchObject({
        ...dto,
        typeData: expect.objectContaining({
          languages: ['portugues', 'ingles'],
        }),
      });
      expect(saved.typeData.itinerary[0]).toMatchObject({
        name: 'Lisboa',
        id: expect.any(String),
      });
    });

    it('should throw BadRequestException for TOUR_GUIDE with invalid photo URL', () => {
      const dto = {
        businessType: 'TOUR_GUIDE' as any,
        name: 'Lucas Turismo',
        city: 'Calheta',
        typeData: {
          itinerary: [
            {
              name: 'Lisboa',
              photos: [{ url: 'not-a-valid-url' }],
            },
          ],
        },
      };

      expect(() => service.create('user-id-1', dto)).toThrow(
        BadRequestException,
      );
      expect(repository.create).not.toHaveBeenCalled();
    });
  });

  // ── update ─────────────────────────────────────────────────

  describe('update (saves draft only)', () => {
    it('should save draft when user is owner', async () => {
      const updated = {
        ...mockBusiness,
        draftData: { name: 'Updated Restaurant' },
      };
      repository.findByIdAndUserId.mockResolvedValue(mockBusiness);
      repository.saveDraft.mockResolvedValue(updated);

      const dto = { name: 'Updated Restaurant' };
      const result = await service.update('business-id-1', 'user-id-1', dto);

      expect(result).toEqual(updated);
      expect(repository.findByIdAndUserId).toHaveBeenCalledWith(
        'business-id-1',
        'user-id-1',
      );
      expect(repository.saveDraft).toHaveBeenCalledWith('business-id-1', dto);
      expect(repository.update).not.toHaveBeenCalled();
    });

    it('should throw ForbiddenException when user is not owner (repository returns null)', async () => {
      repository.findByIdAndUserId.mockResolvedValue(null);

      await expect(
        service.update('business-id-1', 'other-user-id', { name: 'X' }),
      ).rejects.toThrow(ForbiddenException);
      expect(repository.saveDraft).not.toHaveBeenCalled();
    });

    it('should validate typeData when provided in update', async () => {
      repository.findByIdAndUserId.mockResolvedValue(mockBusiness);

      const dto = {
        typeData: { priceRange: 'INVALID' },
      };

      await expect(
        service.update('business-id-1', 'user-id-1', dto),
      ).rejects.toThrow(BadRequestException);
      expect(repository.saveDraft).not.toHaveBeenCalled();
    });

    it('should validate typeData against the new businessType (not the existing one)', async () => {
      repository.findByIdAndUserId.mockResolvedValue(mockBusiness); // existing is RESTAURANT

      const dto = {
        businessType: 'LEGAL' as any,
        typeData: { specializations: 12345 } as any,
      };

      await expect(
        service.update('business-id-1', 'user-id-1', dto),
      ).rejects.toThrow(BadRequestException);
      expect(repository.saveDraft).not.toHaveBeenCalled();
    });

    it('should save draft with valid typeData', async () => {
      const updatedBusiness = {
        ...mockBusiness,
        draftData: { typeData: { cuisine: 'Italiana' } },
      };
      repository.findByIdAndUserId.mockResolvedValue(mockBusiness);
      repository.saveDraft.mockResolvedValue(updatedBusiness);

      const result = await service.update('business-id-1', 'user-id-1', {
        typeData: { cuisine: 'Italiana' } as any,
      });

      expect(result).toEqual(updatedBusiness);
      expect(repository.saveDraft).toHaveBeenCalled();
    });
  });

  describe('publishDraft', () => {
    it('should apply draft and clear draftData', async () => {
      const draft = { name: 'Published Name' };
      const withDraft = { ...mockBusiness, draftData: draft };
      const published = {
        ...mockBusiness,
        name: 'Published Name',
        draftData: null,
      };
      repository.findByIdAndUserId.mockResolvedValue(withDraft);
      repository.applyDraftAndClearDraft.mockResolvedValue(published);

      const result = await service.publishDraft('business-id-1', 'user-id-1');

      expect(result).toEqual(published);
      expect(repository.applyDraftAndClearDraft).toHaveBeenCalledWith(
        'business-id-1',
        draft,
      );
    });

    it('should throw BadRequestException when no draft', async () => {
      repository.findByIdAndUserId.mockResolvedValue(mockBusiness);

      await expect(
        service.publishDraft('business-id-1', 'user-id-1'),
      ).rejects.toThrow(BadRequestException);
      expect(repository.applyDraftAndClearDraft).not.toHaveBeenCalled();
    });
  });

  describe('discardDraft', () => {
    it('should clear draft', async () => {
      const cleared = { ...mockBusiness, draftData: null };
      repository.findByIdAndUserId.mockResolvedValue({
        ...mockBusiness,
        draftData: { name: 'X' },
      });
      repository.clearDraft.mockResolvedValue(cleared);

      const result = await service.discardDraft('business-id-1', 'user-id-1');

      expect(result).toEqual(cleared);
      expect(repository.clearDraft).toHaveBeenCalledWith('business-id-1');
    });

    it('should throw BadRequestException when no draft', async () => {
      repository.findByIdAndUserId.mockResolvedValue(mockBusiness);

      await expect(
        service.discardDraft('business-id-1', 'user-id-1'),
      ).rejects.toThrow(BadRequestException);
      expect(repository.clearDraft).not.toHaveBeenCalled();
    });
  });

  // ── delete ─────────────────────────────────────────────────

  describe('delete', () => {
    it('should delete a business when user is owner', async () => {
      repository.findByIdAndUserId.mockResolvedValue(mockBusiness);
      repository.delete.mockResolvedValue(mockBusiness);

      const result = await service.delete('business-id-1', 'user-id-1');

      expect(result).toEqual(mockBusiness);
      expect(repository.delete).toHaveBeenCalledWith('business-id-1');
    });

    it('should throw ForbiddenException when user is not owner', async () => {
      repository.findByIdAndUserId.mockResolvedValue(null);

      await expect(
        service.delete('business-id-1', 'other-user-id'),
      ).rejects.toThrow(ForbiddenException);
      expect(repository.delete).not.toHaveBeenCalled();
    });
  });

  // ── visibility never rides the draft ───────────────────────

  describe('visibility and the draft', () => {
    it('keeps isPublic out of a draft being saved', async () => {
      repository.findByIdAndUserId.mockResolvedValue(mockBusiness);
      repository.saveDraft.mockResolvedValue(mockBusiness);

      await service.update('business-id-1', 'user-id-1', {
        name: 'Outro nome',
        isPublic: true,
      });

      const draft = repository.saveDraft.mock.calls[0][1] as Record<
        string,
        unknown
      >;
      expect(draft).not.toHaveProperty('isPublic');
      expect(draft.name).toBe('Outro nome');
    });

    it('ignores isPublic in a draft written before the rule', async () => {
      // The one that bit an owner: they turned their listing on, then
      // published an older draft, and the stored `isPublic: false` put it
      // straight back. Drafts like that are already in the database.
      repository.findByIdAndUserId.mockResolvedValue({
        ...mockBusiness,
        isPublic: true,
        draftData: { name: 'Outro nome', isPublic: false },
      });
      repository.applyDraftAndClearDraft.mockResolvedValue(mockBusiness);

      await service.publishDraft('business-id-1', 'user-id-1');

      const applied = repository.applyDraftAndClearDraft.mock
        .calls[0][1] as Record<string, unknown>;
      expect(applied).not.toHaveProperty('isPublic');
      expect(applied.name).toBe('Outro nome');
    });
  });

  // ── toggleVisibility ───────────────────────────────────────

  describe('toggleVisibility', () => {
    it('should toggle visibility when user is owner', async () => {
      const updated = { ...mockBusiness, isPublic: true };
      repository.findByIdAndUserId.mockResolvedValue(mockBusiness);
      repository.toggleVisibility.mockResolvedValue(updated);

      const result = await service.toggleVisibility(
        'business-id-1',
        'user-id-1',
        true,
      );

      expect(result).toEqual(updated);
      expect(repository.toggleVisibility).toHaveBeenCalledWith(
        'business-id-1',
        true,
      );
    });

    it('should throw ForbiddenException when user is not owner', async () => {
      repository.findByIdAndUserId.mockResolvedValue(null);

      await expect(
        service.toggleVisibility('business-id-1', 'other-user-id', true),
      ).rejects.toThrow(ForbiddenException);
      expect(repository.toggleVisibility).not.toHaveBeenCalled();
    });
  });

  // ── getPublicBusinesses ────────────────────────────────────

  describe('getPublicBusinesses', () => {
    it('should return paginated public businesses', async () => {
      const paginatedResult = { data: [mockBusiness], total: 1 };
      repository.findPublic.mockResolvedValue(paginatedResult);

      const query = { page: 1, limit: 20 };
      const result = await service.getPublicBusinesses(query as any);

      expect(result).toEqual(paginatedResult);
      expect(repository.findPublic).toHaveBeenCalledWith(query);
    });
  });

  // ── getPublicBusinessById ──────────────────────────────────

  describe('getPublicBusinessById', () => {
    it('should return a public business by id', async () => {
      const publicBusiness = { ...mockBusiness, isPublic: true };
      repository.findVisibleById.mockResolvedValue(publicBusiness);

      const result = await service.getPublicBusinessById('business-id-1');

      expect(result).toEqual(publicBusiness);
      expect(repository.findVisibleById).toHaveBeenCalledWith('business-id-1');
    });

    it('should throw NotFoundException when business not found (repository returns null)', async () => {
      repository.findVisibleById.mockResolvedValue(null);

      await expect(
        service.getPublicBusinessById('non-existent'),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('identidade dos itens de typeData', () => {
    const UUID =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

    it('gera id para cada prato do menu ao criar', async () => {
      mockBusinessRepository.create.mockResolvedValue(mockBusiness);

      await service.create('user-id-1', {
        businessType: 'RESTAURANT',
        name: 'Cantina',
        city: 'Porto',
        typeData: {
          menu: [
            { name: 'Bacalhau', price: 18 },
            { name: 'Francesinha', price: 14 },
          ],
        },
      } as any);

      const saved = mockBusinessRepository.create.mock.calls[0][1];
      const menu = saved.typeData.menu;
      expect(menu).toHaveLength(2);
      for (const item of menu) {
        expect(item.id).toMatch(UUID);
      }
      expect(menu[0].id).not.toBe(menu[1].id);
    });

    /**
     * A propriedade que faz o id valer. Se ele fosse regerado a cada gravação,
     * editar o preço de um prato trocaria a identidade de todos — exatamente o
     * que o id existe para evitar.
     */
    it('preserva o id existente ao gravar de novo', async () => {
      mockBusinessRepository.create.mockResolvedValue(mockBusiness);
      const existingId = '3f2a1c4e-9b7d-4e1a-8c3f-2d5b6a7e8f90';

      await service.create('user-id-1', {
        businessType: 'RESTAURANT',
        name: 'Cantina',
        city: 'Porto',
        typeData: {
          menu: [
            { id: existingId, name: 'Bacalhau', price: 20 },
            { name: 'Novo prato', price: 9 },
          ],
        },
      } as any);

      const menu = mockBusinessRepository.create.mock.calls[0][1].typeData.menu;
      expect(menu[0].id).toBe(existingId);
      expect(menu[1].id).toMatch(UUID);
    });

    it('cobre tours, itinerário e as fotos aninhadas do guia', async () => {
      mockBusinessRepository.create.mockResolvedValue(mockBusiness);

      await service.create('user-id-1', {
        businessType: 'TOUR_GUIDE',
        name: 'Guia do Douro',
        city: 'Porto',
        typeData: {
          tours: [{ name: 'Douro a pé', duration: '3h', price: 40 }],
          itinerary: [
            {
              name: 'Ribeira',
              photos: [{ url: 'https://cdn.example.com/a.jpg' }],
            },
          ],
        },
      } as any);

      const data = mockBusinessRepository.create.mock.calls[0][1].typeData;
      expect(data.tours[0].id).toMatch(UUID);
      expect(data.itinerary[0].id).toMatch(UUID);
      expect(data.itinerary[0].photos[0].id).toMatch(UUID);
    });

    it('não mexe em typeData de tipo sem itens identificáveis', async () => {
      mockBusinessRepository.create.mockResolvedValue(mockBusiness);
      const typeData = { specializations: ['Imigração'] };

      await service.create('user-id-1', {
        businessType: 'LEGAL',
        name: 'Escritório',
        city: 'Porto',
        typeData,
      } as any);

      expect(mockBusinessRepository.create.mock.calls[0][1].typeData).toEqual(
        typeData,
      );
    });

    it('atribui id também ao salvar rascunho', async () => {
      mockBusinessRepository.findByIdAndUserId.mockResolvedValue(mockBusiness);
      mockBusinessRepository.saveDraft.mockResolvedValue(mockBusiness);

      await service.update('business-id-1', 'user-id-1', {
        typeData: { menu: [{ name: 'Sopa', price: 5 }] },
      } as any);

      const draft = mockBusinessRepository.saveDraft.mock.calls[0][1];
      expect(draft.typeData.menu[0].id).toMatch(UUID);
    });
  });
  /**
   * O horário saiu de duas strings livres para uma semana estruturada, e o
   * caminho onde ele mais poderia se perder é o rascunho: `update` grava JSON
   * cru numa coluna e `publishDraft` o relê, então nada garante que o que sai é
   * o que entrou a não ser um teste que atravesse os dois.
   */
  describe('a semana de funcionamento', () => {
    const SPLIT_WEEK = {
      monday: { closed: true },
      tuesday: {
        closed: false,
        intervals: [
          { open: '12:00', close: '15:00' },
          { open: '19:00', close: '23:00' },
        ],
      },
      saturday: {
        closed: false,
        intervals: [{ open: '19:00', close: '02:00' }],
      },
    };

    it('keeps a split service and a closing day on create', async () => {
      repository.create.mockResolvedValue(mockBusiness);

      await service.create('user-id-1', {
        businessType: 'RESTAURANT' as any,
        name: 'A Padaria',
        city: 'Lisboa',
        openingHours: SPLIT_WEEK as any,
        timezone: 'Europe/Lisbon',
      });

      expect(repository.create).toHaveBeenCalledWith(
        'user-id-1',
        expect.objectContaining({
          openingHours: SPLIT_WEEK,
          timezone: 'Europe/Lisbon',
        }),
      );
    });

    it('refuses a week that cannot be true, naming the day', () => {
      // Síncrono como o irmão do `typeData`: a validação lança antes de a
      // promessa do repositório existir.
      expect(() =>
        service.create('user-id-1', {
          businessType: 'RESTAURANT' as any,
          name: 'A Padaria',
          city: 'Lisboa',
          openingHours: {
            monday: {
              closed: false,
              intervals: [
                { open: '12:00', close: '16:00' },
                { open: '15:00', close: '23:00' },
              ],
            },
          } as any,
        }),
      ).toThrow(BadRequestException);

      expect(repository.create).not.toHaveBeenCalled();
    });

    it('carries the week through the draft and out the other side', async () => {
      repository.findByIdAndUserId.mockResolvedValue(mockBusiness);
      repository.saveDraft.mockResolvedValue(mockBusiness);

      await service.update('business-id-1', 'user-id-1', {
        openingHours: SPLIT_WEEK as any,
      });

      expect(repository.saveDraft).toHaveBeenCalledWith(
        'business-id-1',
        expect.objectContaining({ openingHours: SPLIT_WEEK }),
      );

      repository.findByIdAndUserId.mockResolvedValue({
        ...mockBusiness,
        draftData: { openingHours: SPLIT_WEEK },
      });
      repository.applyDraftAndClearDraft.mockResolvedValue(mockBusiness);

      await service.publishDraft('business-id-1', 'user-id-1');

      expect(repository.applyDraftAndClearDraft).toHaveBeenCalledWith(
        'business-id-1',
        expect.objectContaining({ openingHours: SPLIT_WEEK }),
      );
    });

    it('catches a broken week stored in a draft, not only one sent by the form', async () => {
      // O rascunho é JSON cru na coluna; validar só na entrada deixaria passar
      // qualquer coisa que chegasse por outro caminho.
      repository.findByIdAndUserId.mockResolvedValue({
        ...mockBusiness,
        draftData: {
          openingHours: {
            monday: {
              closed: false,
              intervals: [{ open: '12:00', close: '12:00' }],
            },
          },
        },
      });

      await expect(
        service.publishDraft('business-id-1', 'user-id-1'),
      ).rejects.toThrow(BadRequestException);
      expect(repository.applyDraftAndClearDraft).not.toHaveBeenCalled();
    });

    it('lets a business exist with no hours at all', async () => {
      repository.create.mockResolvedValue(mockBusiness);

      await expect(
        service.create('user-id-1', {
          businessType: 'GENERAL' as any,
          name: 'Serviço',
          city: 'Lisboa',
        }),
      ).resolves.toBeDefined();
    });
  });
});
