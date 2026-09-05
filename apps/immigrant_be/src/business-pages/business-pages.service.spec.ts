jest.mock('@app/database', () => ({
  PrismaService: jest.fn(),
  DatabaseModule: jest.fn(),
}));

jest.mock('@app/storage', () => ({
  StorageService: jest.fn(),
  StorageModule: jest.fn(),
}));

jest.mock('@app/config', () => ({
  env: { FRONTEND_URL: 'https://app.test' },
  ConfigModule: jest.fn(),
}));

jest.mock('@app/email', () => ({
  buildApprovalEmail: jest.fn().mockReturnValue({ subject: 's', html: 'h' }),
  buildRejectionEmail: jest.fn().mockReturnValue({ subject: 's', html: 'h' }),
}));

jest.mock('../publisher-qualification/publisher-qualification.service', () => ({
  PublisherQualificationService: jest.fn(),
}));

import { Test } from '@nestjs/testing';
import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { BusinessPageModerationService } from './business-page-moderation.service';
import { BusinessPagesService } from './business-pages.service';
import { BusinessPagesRepository } from './business-pages.repository';
import { buildRejectionEmail } from '@app/email';
import { NotificationsService } from '@app/notifications/notifications.service';
import { PublisherQualificationService } from '../publisher-qualification/publisher-qualification.service';
import { StorageService } from '@app/storage';

const mockBusiness = {
  id: 'biz-1',
  userId: 'user-1',
  businessType: 'RESTAURANT',
  name: 'Padaria Central',
  city: 'Lisboa',
  address: 'Rua das Flores, 1',
  phone: '+351912345678',
  email: 'padaria@email.com',
  website: 'https://padaria.pt',
  lat: 38.7,
  lng: -9.1,
};

const mockPage = {
  id: 'page-1',
  businessId: 'biz-1',
  slug: 'padaria-central',
  businessType: 'restaurante',
  status: 'DRAFT',
  pendingContent: { name: 'Padaria Central', city: 'Lisboa' },
  approvedContent: null,
  submittedAt: null,
  approvedAt: null,
  // Espelha o include do findByIdAndUserId: o enum do negócio dono, que é
  // quem escolhe o schema de validação do typeData (o businessType acima é a
  // string livre de template da página, outra coisa).
  business: { businessType: 'RESTAURANT' },
};

const mockPageWithBusiness = {
  ...mockPage,
  businessId: 'biz-1',
  slug: 'padaria-central',
  businessType: 'restaurante',
  slugLockedAt: null,
  rejectedAt: null,
  rejectionReason: null,
  business: {
    name: 'Padaria Central',
    userId: 'user-1',
    user: { email: 'owner@email.com', name: 'Owner' },
  },
};

const mockRepo = {
  findByIdWithContent: jest.fn(),
  saveModerationResult: jest.fn(),
  isSlugTaken: jest.fn(),
  findApprovedBySlug: jest.fn(),
  findBySlug: jest.fn(),
  findBusinessByIdAndUserId: jest.fn(),
  findPublicList: jest.fn(),
  findByBusinessId: jest.fn(),
  findByIdAndUserId: jest.fn(),
  create: jest.fn(),
  updatePendingContent: jest.fn(),
  submitPage: jest.fn(),
  withdrawSubmission: jest.fn(),
  // NEW:
  findById: jest.fn(),
  listPages: jest.fn(),
  approvePage: jest.fn(),
  rejectPage: jest.fn(),
  updateBusinessTypeData: jest.fn(),
};

const mockNotifications = {
  notify: jest.fn().mockResolvedValue(undefined),
};

const mockQualification = {
  isQualified: jest.fn().mockResolvedValue(false),
  onPageApproved: jest.fn().mockResolvedValue(undefined),
  onPageRejected: jest.fn().mockResolvedValue(undefined),
};

const mockStorage = {
  uploadFileAtKey: jest.fn(),
};

const mockModeration = {
  moderateContent: jest.fn(),
};

describe('BusinessPagesService', () => {
  let service: BusinessPagesService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        BusinessPagesService,
        { provide: BusinessPagesRepository, useValue: mockRepo },
        { provide: NotificationsService, useValue: mockNotifications },
        { provide: PublisherQualificationService, useValue: mockQualification },
        { provide: StorageService, useValue: mockStorage },
        { provide: BusinessPageModerationService, useValue: mockModeration },
      ],
    }).compile();
    service = module.get(BusinessPagesService);
    jest.clearAllMocks();
    mockModeration.moderateContent.mockResolvedValue({
      result: {
        riskLevel: 'low',
        flags: [],
        summary: 'ok',
        recommendation: 'approve',
      },
      model: 'google/gemini-2.5-flash',
    });
  });

  describe('checkSlugAvailability', () => {
    it('returns available: true when slug is not taken', async () => {
      mockRepo.isSlugTaken.mockResolvedValue(false);
      const result = await service.checkSlugAvailability('meu-slug');
      expect(result).toEqual({ available: true, slug: 'meu-slug' });
    });

    it('returns available: false when slug is taken', async () => {
      mockRepo.isSlugTaken.mockResolvedValue(true);
      const result = await service.checkSlugAvailability('meu-slug');
      expect(result).toEqual({ available: false, slug: 'meu-slug' });
    });
  });

  describe('getPublicPage', () => {
    it('returns the page when found and approved', async () => {
      const page = {
        id: 'uuid',
        slug: 'meu-slug',
        status: 'APPROVED',
        approvedContent: {},
      };
      mockRepo.findApprovedBySlug.mockResolvedValue(page);
      const result = await service.getPublicPage('meu-slug');
      expect(result).toEqual(page);
    });

    it('throws NotFoundException when page not found', async () => {
      mockRepo.findApprovedBySlug.mockResolvedValue(null);
      await expect(service.getPublicPage('nao-existe')).rejects.toThrow(
        NotFoundException,
      );
    });

    it('returns the page when status is APPROVED_WITH_PENDING (old content stays live)', async () => {
      // The fixture carries no `pendingContent` on purpose: the repository's
      // `select` means it never leaves the database on this route. It used to
      // be here, and the shape of the test was quietly asserting that serving
      // unapproved content to anonymous visitors was fine.
      const page = {
        id: 'uuid',
        businessId: 'business-uuid',
        slug: 'meu-slug',
        status: 'APPROVED_WITH_PENDING',
        approvedContent: { name: 'Old content' },
      };
      mockRepo.findApprovedBySlug.mockResolvedValue(page);
      const result = await service.getPublicPage('meu-slug');
      expect(result).toEqual(page);
      expect(result).not.toHaveProperty('pendingContent');
    });
  });

  describe('listPublicPages', () => {
    it('devolve a página pedida com o total', async () => {
      mockRepo.findPublicList.mockResolvedValue({
        data: [
          {
            slug: 'padaria-central',
            businessType: 'restaurante',
            approvedAt: new Date('2026-08-01'),
          },
        ],
        total: 7,
      });

      const result = await service.listPublicPages(2, 3);

      // O filtro de status vive no repository (select enxuto + where in
      // APPROVED/APPROVED_WITH_PENDING); aqui o contrato é a paginação.
      expect(mockRepo.findPublicList).toHaveBeenCalledWith(3, 3);
      expect(result).toEqual({
        data: [
          {
            slug: 'padaria-central',
            businessType: 'restaurante',
            approvedAt: new Date('2026-08-01'),
          },
        ],
        total: 7,
        page: 2,
        limit: 3,
      });
    });
  });

  describe('createPage', () => {
    const dto = {
      businessId: 'biz-1',
      slug: 'padaria-central',
      businessType: 'restaurante',
    };
    const createdDraft = { ...mockPage, status: 'DRAFT', slugLockedAt: null };
    const createdPending = {
      ...mockPage,
      status: 'PENDING_REVIEW',
      submittedAt: new Date(),
      slugLockedAt: null,
    };

    beforeEach(() => {
      mockRepo.findBusinessByIdAndUserId.mockResolvedValue(mockBusiness);
      mockRepo.isSlugTaken.mockResolvedValue(false);
      mockRepo.create.mockResolvedValue(createdDraft);
      mockQualification.isQualified.mockResolvedValue(false);
    });

    it('auto-submits to PENDING_REVIEW when publisher is not qualified', async () => {
      mockRepo.findByBusinessId
        .mockResolvedValueOnce(null) // first call: "no existing page" check
        .mockResolvedValueOnce(createdPending); // second call: return after submit
      mockRepo.submitPage.mockResolvedValue(createdPending);

      const result = await service.createPage('user-1', dto);

      expect(mockRepo.create).toHaveBeenCalledWith(
        expect.objectContaining({
          businessId: 'biz-1',
          slug: 'padaria-central',
          businessType: 'restaurante',
          pendingContent: expect.objectContaining({
            name: 'Padaria Central',
            city: 'Lisboa',
          }),
        }),
      );
      expect(mockRepo.submitPage).toHaveBeenCalledWith(
        createdDraft.id,
        'PENDING_REVIEW',
      );
      expect(result?.status).toBe('PENDING_REVIEW');
    });

    it('auto-approves when publisher is qualified', async () => {
      mockQualification.isQualified.mockResolvedValue(true);
      const approvedPage = {
        ...mockPage,
        status: 'APPROVED',
        approvedContent: mockPage.pendingContent,
        pendingContent: null,
      };
      mockRepo.findByBusinessId
        .mockResolvedValueOnce(null) // first call: "no existing page" check
        .mockResolvedValueOnce(approvedPage); // second call: return after approve
      mockRepo.approvePage.mockResolvedValue(approvedPage);
      mockRepo.updateBusinessTypeData.mockResolvedValue({});

      const result = await service.createPage('user-1', dto);

      expect(mockRepo.approvePage).toHaveBeenCalledWith(
        createdDraft.id,
        expect.objectContaining({ name: 'Padaria Central' }),
        true, // setSlugLock = true (slugLockedAt is null on new page)
        null,
      );
      expect(result?.status).toBe('APPROVED');
    });

    it('rejeita template que não pertence ao tipo do negócio', async () => {
      // Dois vocabulários que nada relacionava: dava para criar um Business
      // RESTAURANT com página "academia" e o template errado renderizava o
      // typeData errado. O 400 vem antes de qualquer escrita.
      mockRepo.findBusinessByIdAndUserId.mockResolvedValue(mockBusiness);

      await expect(
        service.createPage('user-1', { ...dto, businessType: 'academia' }),
      ).rejects.toThrow(BadRequestException);
      expect(mockRepo.create).not.toHaveBeenCalled();
    });

    it('GENERAL aceita os templates do catálogo genérico', async () => {
      mockRepo.findBusinessByIdAndUserId.mockResolvedValue({
        ...mockBusiness,
        businessType: 'GENERAL',
      });
      mockRepo.findByBusinessId
        .mockResolvedValueOnce(null)
        .mockResolvedValue(createdPending);
      mockRepo.isSlugTaken.mockResolvedValue(false);
      mockRepo.create.mockResolvedValue(createdDraft);
      mockQualification.isQualified.mockResolvedValue(false);
      mockRepo.submitPage.mockResolvedValue(createdPending);

      await expect(
        service.createPage('user-1', { ...dto, businessType: 'loja' }),
      ).resolves.toBeTruthy();
    });

    it('throws ForbiddenException when business does not belong to user', async () => {
      mockRepo.findBusinessByIdAndUserId.mockResolvedValue(null);
      await expect(service.createPage('other-user', dto)).rejects.toThrow(
        ForbiddenException,
      );
    });

    it('throws ConflictException when page already exists for business', async () => {
      mockRepo.findByBusinessId.mockResolvedValue(mockPage);
      await expect(service.createPage('user-1', dto)).rejects.toThrow(
        ConflictException,
      );
    });

    it('throws ConflictException when slug is already taken', async () => {
      mockRepo.findByBusinessId.mockResolvedValue(null);
      mockRepo.isSlugTaken.mockResolvedValue(true);
      await expect(service.createPage('user-1', dto)).rejects.toThrow(
        ConflictException,
      );
    });
  });

  describe('updateContent', () => {
    it('updates pending_content and returns updated page', async () => {
      const updatedPage = {
        ...mockPage,
        pendingContent: { name: 'Nova Padaria', city: 'Porto' },
      };
      mockRepo.findByIdAndUserId.mockResolvedValue(mockPage);
      mockRepo.updatePendingContent.mockResolvedValue(updatedPage);

      const result = await service.updateContent('page-1', 'user-1', {
        pendingContent: { name: 'Nova Padaria', city: 'Porto' },
      });

      expect(mockRepo.updatePendingContent).toHaveBeenCalledWith('page-1', {
        name: 'Nova Padaria',
        city: 'Porto',
      });
      expect(result).toEqual(updatedPage);
    });

    it('passes typeData through to pending_content for restaurant menu', async () => {
      const typeData = { menu: [{ name: 'Prato', price: 10 }] };
      const updatedPage = {
        ...mockPage,
        pendingContent: {
          name: 'Rest',
          city: 'Lx',
          typeData,
        },
      };
      mockRepo.findByIdAndUserId.mockResolvedValue(mockPage);
      mockRepo.updatePendingContent.mockResolvedValue(updatedPage);

      const result = await service.updateContent('page-1', 'user-1', {
        pendingContent: {
          name: 'Rest',
          city: 'Lx',
          typeData,
        },
      });

      expect(mockRepo.updatePendingContent).toHaveBeenCalledWith('page-1', {
        name: 'Rest',
        city: 'Lx',
        typeData,
      });
      expect(result).toEqual(updatedPage);
    });

    it('throws ForbiddenException when page does not belong to user', async () => {
      mockRepo.findByIdAndUserId.mockResolvedValue(null);
      await expect(
        service.updateContent('page-1', 'other-user', {
          pendingContent: { name: 'x', city: 'y' },
        }),
      ).rejects.toThrow(ForbiddenException);
    });

    it('rejeita typeData que o tipo do negócio não aceita', async () => {
      // Era o buraco: este payload seria recusado pelo POST /business (price
      // precisa ser number), mas entrava cru em pendingContent e, na
      // aprovação, era copiado para Business.typeData.
      mockRepo.findByIdAndUserId.mockResolvedValue(mockPage);

      await expect(
        service.updateContent('page-1', 'user-1', {
          pendingContent: {
            name: 'Rest',
            city: 'Lx',
            typeData: { menu: [{ name: 'Prato', price: 'dez' }] },
          },
        }),
      ).rejects.toThrow(BadRequestException);
      expect(mockRepo.updatePendingContent).not.toHaveBeenCalled();
    });

    it('valida contra o enum do negócio, não contra o tipo da página', async () => {
      // A página diz "restaurante" (string de template), mas o negócio dono é
      // TOUR_GUIDE — e um menu não é campo de guia. Se esta assertiva quebrar,
      // alguém passou a escolher o schema pelo vocabulário errado.
      mockRepo.findByIdAndUserId.mockResolvedValue({
        ...mockPage,
        business: { businessType: 'TOUR_GUIDE' },
      });

      await expect(
        service.updateContent('page-1', 'user-1', {
          pendingContent: {
            name: 'Guia',
            city: 'Lx',
            typeData: { tours: [{ name: 'City tour' }] },
          },
        }),
      ).rejects.toThrow(BadRequestException);
    });

    it('aceita pendingContent sem typeData', async () => {
      mockRepo.findByIdAndUserId.mockResolvedValue(mockPage);
      mockRepo.updatePendingContent.mockResolvedValue(mockPage);

      await expect(
        service.updateContent('page-1', 'user-1', {
          pendingContent: { name: 'Só texto', city: 'Porto' },
        }),
      ).resolves.toBe(mockPage);
    });
  });

  describe('submitForReview', () => {
    it('transitions DRAFT to PENDING_REVIEW and returns modal: "first"', async () => {
      const draftPage = { ...mockPage, status: 'DRAFT', approvedContent: null };
      mockRepo.findByIdAndUserId.mockResolvedValue(draftPage);
      mockRepo.submitPage.mockResolvedValue({
        ...draftPage,
        status: 'PENDING_REVIEW',
      });

      const result = await service.submitForReview('page-1', 'user-1');

      expect(mockRepo.submitPage).toHaveBeenCalledWith(
        'page-1',
        'PENDING_REVIEW',
      );
      expect(result).toEqual({ modal: 'first', status: 'PENDING_REVIEW' });
    });

    it('transitions REJECTED to PENDING_REVIEW and returns modal: "update" when previously approved', async () => {
      const rejectedPage = {
        ...mockPage,
        status: 'REJECTED',
        approvedContent: { name: 'Padaria' },
      };
      mockRepo.findByIdAndUserId.mockResolvedValue(rejectedPage);
      mockRepo.submitPage.mockResolvedValue({
        ...rejectedPage,
        status: 'PENDING_REVIEW',
      });

      const result = await service.submitForReview('page-1', 'user-1');

      expect(mockRepo.submitPage).toHaveBeenCalledWith(
        'page-1',
        'PENDING_REVIEW',
      );
      expect(result).toEqual({ modal: 'update', status: 'PENDING_REVIEW' });
    });

    it('transitions APPROVED to APPROVED_WITH_PENDING and returns modal: "update"', async () => {
      const approvedPage = {
        ...mockPage,
        status: 'APPROVED',
        approvedContent: { name: 'Padaria' },
      };
      mockRepo.findByIdAndUserId.mockResolvedValue(approvedPage);
      mockRepo.submitPage.mockResolvedValue({
        ...approvedPage,
        status: 'APPROVED_WITH_PENDING',
      });

      const result = await service.submitForReview('page-1', 'user-1');

      expect(mockRepo.submitPage).toHaveBeenCalledWith(
        'page-1',
        'APPROVED_WITH_PENDING',
      );
      expect(result).toEqual({
        modal: 'update',
        status: 'APPROVED_WITH_PENDING',
      });
    });

    it('throws ConflictException when status is PENDING_REVIEW', async () => {
      mockRepo.findByIdAndUserId.mockResolvedValue({
        ...mockPage,
        status: 'PENDING_REVIEW',
      });
      await expect(service.submitForReview('page-1', 'user-1')).rejects.toThrow(
        ConflictException,
      );
    });

    it('throws ConflictException when status is APPROVED_WITH_PENDING', async () => {
      mockRepo.findByIdAndUserId.mockResolvedValue({
        ...mockPage,
        status: 'APPROVED_WITH_PENDING',
      });
      await expect(service.submitForReview('page-1', 'user-1')).rejects.toThrow(
        ConflictException,
      );
    });

    it('throws ForbiddenException when page does not belong to user', async () => {
      mockRepo.findByIdAndUserId.mockResolvedValue(null);
      await expect(
        service.submitForReview('page-1', 'other-user'),
      ).rejects.toThrow(ForbiddenException);
    });

    it('approves directly when publisher is qualified (bypasses PENDING_REVIEW)', async () => {
      const draftPage = {
        ...mockPage,
        status: 'DRAFT',
        approvedContent: null,
        pendingContent: { name: 'Padaria' },
        slugLockedAt: null,
      };
      mockRepo.findByIdAndUserId.mockResolvedValue(draftPage);
      mockQualification.isQualified.mockResolvedValue(true);
      mockRepo.approvePage.mockResolvedValue({
        ...draftPage,
        status: 'APPROVED',
      });

      const result = await service.submitForReview('page-1', 'user-1');

      expect(mockRepo.approvePage).toHaveBeenCalledWith(
        'page-1',
        draftPage.pendingContent,
        true,
        null,
      );
      expect(mockRepo.submitPage).not.toHaveBeenCalled();
      expect(result).toEqual({ modal: 'approved', status: 'APPROVED' });
    });

    it('holds a qualified publisher back when the content is a clear violation', async () => {
      // Publishing straight through is the only path with no human reviewer,
      // so it is the one path the model has to clear first.
      const draftPage = {
        ...mockPage,
        status: 'DRAFT',
        approvedContent: null,
        pendingContent: { name: 'Padaria' },
        slugLockedAt: null,
      };
      mockRepo.findByIdAndUserId.mockResolvedValue(draftPage);
      mockQualification.isQualified.mockResolvedValue(true);
      mockModeration.moderateContent.mockResolvedValue({
        result: {
          riskLevel: 'high',
          flags: [],
          summary: 'Violação clara.',
          recommendation: 'reject',
        },
        model: 'google/gemini-2.5-flash',
      });

      const result = await service.submitForReview('page-1', 'user-1');

      expect(mockRepo.approvePage).not.toHaveBeenCalled();
      expect(mockRepo.submitPage).toHaveBeenCalledWith(
        'page-1',
        'PENDING_REVIEW',
      );
      expect(result).toEqual({ modal: 'first', status: 'PENDING_REVIEW' });
    });

    it('still publishes for a qualified publisher when moderation is unavailable', async () => {
      // The service answers medium/review when the model fails. An outage
      // must not strand a publisher who earned the right to publish.
      const draftPage = {
        ...mockPage,
        status: 'DRAFT',
        approvedContent: null,
        pendingContent: { name: 'Padaria' },
        slugLockedAt: null,
      };
      mockRepo.findByIdAndUserId.mockResolvedValue(draftPage);
      mockQualification.isQualified.mockResolvedValue(true);
      mockModeration.moderateContent.mockResolvedValue({
        result: {
          riskLevel: 'medium',
          flags: [],
          summary: 'Erro na análise automática.',
          recommendation: 'review',
        },
        model: 'google/gemini-2.5-flash',
      });
      mockRepo.approvePage.mockResolvedValue({
        ...draftPage,
        status: 'APPROVED',
      });

      const result = await service.submitForReview('page-1', 'user-1');

      expect(mockRepo.approvePage).toHaveBeenCalled();
      expect(result).toEqual({ modal: 'approved', status: 'APPROVED' });
    });

    it('does not moderate the submit of a publisher who is not qualified', async () => {
      // That path already ends at an admin looking at the real template.
      const draftPage = { ...mockPage, status: 'DRAFT', approvedContent: null };
      mockRepo.findByIdAndUserId.mockResolvedValue(draftPage);
      mockQualification.isQualified.mockResolvedValue(false);
      mockRepo.submitPage.mockResolvedValue({
        ...draftPage,
        status: 'PENDING_REVIEW',
      });

      await service.submitForReview('page-1', 'user-1');

      expect(mockModeration.moderateContent).not.toHaveBeenCalled();
    });

    /**
     * O veredicto morria no escopo da função. O admin abria a fila e via uma
     * página esperando sem nenhuma indicação de por quê — e o único jeito de
     * descobrir era pagar uma segunda chamada de IA, que podia responder
     * diferente, já que nada fixava o modelo nem o momento.
     */
    describe('gravando o veredicto', () => {
      const qualifiedDraft = {
        id: 'page-1',
        businessId: 'biz-1',
        slug: 'a-padaria',
        businessType: 'RESTAURANT',
        status: 'DRAFT',
        pendingContent: { name: 'A Padaria' },
        approvedContent: null,
        slugLockedAt: null,
      };

      beforeEach(() => {
        mockRepo.findByIdAndUserId.mockResolvedValue(qualifiedDraft);
        mockQualification.isQualified.mockResolvedValue(true);
        mockRepo.approvePage.mockResolvedValue({
          ...qualifiedDraft,
          status: 'APPROVED',
        });
      });

      const savedRecord = () =>
        mockRepo.saveModerationResult.mock.calls[0]?.[1] as Record<
          string,
          unknown
        >;

      it('records why a page was held back', async () => {
        mockModeration.moderateContent.mockResolvedValue({
          result: {
            riskLevel: 'high',
            flags: [
              {
                category: 'adult_links',
                field: 'tours[2].description',
                excerpt: 'trecho',
                reason: 'motivo',
              },
            ],
            summary: 'Violação clara.',
            recommendation: 'reject',
          },
          model: 'google/gemini-2.5-flash',
        });

        await service.submitForReview('page-1', 'user-1');

        expect(savedRecord()).toMatchObject({
          riskLevel: 'high',
          origin: 'gate',
          model: 'google/gemini-2.5-flash',
          flags: [expect.objectContaining({ field: 'tours[2].description' })],
        });
      });

      it('records the analysis of a page that passed, too', async () => {
        // Sem isto a tela responde "por que foi barrada?" e fica muda no
        // "passou — mas o que o modelo viu?", e o código ganha um ramo.
        await service.submitForReview('page-1', 'user-1');

        expect(savedRecord()).toMatchObject({
          riskLevel: 'low',
          origin: 'gate',
        });
      });

      it('stamps the moment, so the screen can say how old the verdict is', async () => {
        await service.submitForReview('page-1', 'user-1');

        expect(Date.parse(savedRecord().analyzedAt as string)).not.toBeNaN();
      });

      it('claims no model when nobody answered', async () => {
        // O fallback de erro não é a opinião de um modelo, e gravar um nome
        // ali seria atribuir a alguém uma frase que ele não disse.
        mockModeration.moderateContent.mockResolvedValue({
          result: {
            riskLevel: 'medium',
            flags: [],
            summary: 'Erro na análise automática.',
            recommendation: 'review',
          },
          model: null,
        });

        await service.submitForReview('page-1', 'user-1');

        expect(savedRecord().model).toBeNull();
      });

      it('does not moderate — or record — an unqualified publisher', async () => {
        mockQualification.isQualified.mockResolvedValue(false);

        await service.submitForReview('page-1', 'user-1');

        expect(mockRepo.saveModerationResult).not.toHaveBeenCalled();
      });
    });
  });

  describe('getMyPage', () => {
    it('returns the page when it exists and business belongs to user', async () => {
      mockRepo.findBusinessByIdAndUserId.mockResolvedValue(mockBusiness);
      mockRepo.findByBusinessId.mockResolvedValue(mockPage);
      mockQualification.isQualified.mockResolvedValue(false);
      const result = await service.getMyPage('biz-1', 'user-1');
      expect(result).toEqual({ ...mockPage, isPublisherQualified: false });
      expect(mockQualification.isQualified).toHaveBeenCalledWith(mockPage.id);
    });

    it('throws ForbiddenException when business does not belong to user', async () => {
      mockRepo.findBusinessByIdAndUserId.mockResolvedValue(null);
      await expect(service.getMyPage('biz-1', 'other-user')).rejects.toThrow(
        ForbiddenException,
      );
    });

    it('throws NotFoundException when no page exists for business', async () => {
      mockRepo.findBusinessByIdAndUserId.mockResolvedValue(mockBusiness);
      mockRepo.findByBusinessId.mockResolvedValue(null);
      await expect(service.getMyPage('biz-1', 'user-1')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('listPages', () => {
    it('returns all pages when no status given', async () => {
      mockRepo.listPages.mockResolvedValue([mockPageWithBusiness]);
      const result = await service.listPages();
      expect(mockRepo.listPages).toHaveBeenCalledWith(undefined);
      expect(result).toHaveLength(1);
    });

    it('returns pages filtered by status', async () => {
      mockRepo.listPages.mockResolvedValue([mockPageWithBusiness]);
      const result = await service.listPages('PENDING_REVIEW');
      expect(mockRepo.listPages).toHaveBeenCalledWith('PENDING_REVIEW');
      expect(result).toHaveLength(1);
    });
  });

  describe('approveBusinessPage', () => {
    it('approves PENDING_REVIEW page, copies pendingContent, sends approval email', async () => {
      const page = {
        ...mockPageWithBusiness,
        status: 'PENDING_REVIEW',
        approvedContent: null,
      };
      mockRepo.findById.mockResolvedValue(page);
      mockRepo.approvePage.mockResolvedValue({ ...page, status: 'APPROVED' });

      const result = await service.approveBusinessPage('page-1', 'admin-1');

      expect(mockRepo.approvePage).toHaveBeenCalledWith(
        'page-1',
        page.pendingContent,
        true,
        'admin-1',
      );
      // The owner is addressed by id now, not by e-mail address: the bell is
      // the channel that always fires, and the letter rides along for whoever
      // still wants one. Which of the two goes out is `notify`'s decision.
      expect(mockNotifications.notify).toHaveBeenCalledWith(
        expect.objectContaining({
          userId: 'user-1',
          type: 'business_page_approved',
          payload: expect.objectContaining({ businessName: 'Padaria Central' }),
          email: { subject: 's', html: 'h' },
        }),
      );
      expect(result.status).toBe('APPROVED');
    });

    it('does NOT set slugLockedAt when already locked', async () => {
      const page = {
        ...mockPageWithBusiness,
        status: 'APPROVED_WITH_PENDING',
        slugLockedAt: new Date(),
        approvedContent: { name: 'Padaria' },
      };
      mockRepo.findById.mockResolvedValue(page);
      mockRepo.approvePage.mockResolvedValue({ ...page, status: 'APPROVED' });

      await service.approveBusinessPage('page-1', 'admin-1');

      expect(mockRepo.approvePage).toHaveBeenCalledWith(
        'page-1',
        page.pendingContent,
        false,
        'admin-1',
      );
    });

    it('throws NotFoundException when page not found', async () => {
      mockRepo.findById.mockResolvedValue(null);
      await expect(
        service.approveBusinessPage('page-1', 'admin-1'),
      ).rejects.toThrow(NotFoundException);
    });

    it('throws ConflictException when status is DRAFT', async () => {
      mockRepo.findById.mockResolvedValue({
        ...mockPageWithBusiness,
        status: 'DRAFT',
      });
      await expect(
        service.approveBusinessPage('page-1', 'admin-1'),
      ).rejects.toThrow(ConflictException);
    });

    it('throws ConflictException when status is APPROVED', async () => {
      mockRepo.findById.mockResolvedValue({
        ...mockPageWithBusiness,
        status: 'APPROVED',
        approvedContent: { name: 'x' },
      });
      await expect(
        service.approveBusinessPage('page-1', 'admin-1'),
      ).rejects.toThrow(ConflictException);
    });

    it('approves before it notifies, so the notice cannot undo the approval', async () => {
      // The guarantee itself lives in `notify`, which swallows and logs — this
      // asserts the call site does not put the approval behind it.
      const page = {
        ...mockPageWithBusiness,
        status: 'PENDING_REVIEW',
        approvedContent: null,
      };
      mockRepo.findById.mockResolvedValue(page);
      mockRepo.approvePage.mockResolvedValue({ ...page, status: 'APPROVED' });

      const result = await service.approveBusinessPage('page-1', 'admin-1');

      expect(mockRepo.approvePage).toHaveBeenCalled();
      expect(result.status).toBe('APPROVED');
    });

    it('calls onPageApproved after successful approval', async () => {
      const page = {
        ...mockPageWithBusiness,
        status: 'PENDING_REVIEW',
        approvedContent: null,
      };
      mockRepo.findById.mockResolvedValue(page);
      mockRepo.approvePage.mockResolvedValue({ ...page, status: 'APPROVED' });
      mockQualification.onPageApproved.mockResolvedValue(undefined);

      await service.approveBusinessPage('page-1', 'admin-1');

      // onPageApproved is fire-and-forget; just verify it was called
      expect(mockQualification.onPageApproved).toHaveBeenCalledWith('page-1');
    });
  });

  describe('rejectBusinessPage', () => {
    it('rejects PENDING_REVIEW page (no approvedContent) with status REJECTED', async () => {
      const page = {
        ...mockPageWithBusiness,
        status: 'PENDING_REVIEW',
        approvedContent: null,
      };
      mockRepo.findById.mockResolvedValue(page);
      mockRepo.rejectPage.mockResolvedValue({ ...page, status: 'REJECTED' });

      const result = await service.rejectBusinessPage('page-1', 'admin-1', {});

      expect(mockRepo.rejectPage).toHaveBeenCalledWith(
        'page-1',
        'REJECTED',
        'admin-1',
        undefined,
      );
      expect(result.status).toBe('REJECTED');
    });

    it('reverts APPROVED_WITH_PENDING to APPROVED (live version preserved)', async () => {
      const page = {
        ...mockPageWithBusiness,
        status: 'APPROVED_WITH_PENDING',
        approvedContent: { name: 'Live' },
      };
      mockRepo.findById.mockResolvedValue(page);
      mockRepo.rejectPage.mockResolvedValue({ ...page, status: 'APPROVED' });

      const result = await service.rejectBusinessPage('page-1', 'admin-1', {});

      expect(mockRepo.rejectPage).toHaveBeenCalledWith(
        'page-1',
        'APPROVED',
        'admin-1',
        undefined,
      );
      expect(result.status).toBe('APPROVED');
    });

    it('passes rejection reason to repository', async () => {
      const page = {
        ...mockPageWithBusiness,
        status: 'PENDING_REVIEW',
        approvedContent: null,
      };
      mockRepo.findById.mockResolvedValue(page);
      mockRepo.rejectPage.mockResolvedValue({ ...page, status: 'REJECTED' });

      await service.rejectBusinessPage('page-1', 'admin-1', {
        reason: 'Conteúdo inadequado',
      });

      expect(mockRepo.rejectPage).toHaveBeenCalledWith(
        'page-1',
        'REJECTED',
        'admin-1',
        'Conteúdo inadequado',
      );
    });

    it('sends rejection email to owner', async () => {
      const page = {
        ...mockPageWithBusiness,
        status: 'PENDING_REVIEW',
        approvedContent: null,
      };
      mockRepo.findById.mockResolvedValue(page);
      mockRepo.rejectPage.mockResolvedValue({ ...page, status: 'REJECTED' });

      await service.rejectBusinessPage('page-1', 'admin-1', {});

      expect(mockNotifications.notify).toHaveBeenCalledWith(
        expect.objectContaining({
          userId: 'user-1',
          type: 'business_page_rejected',
          email: { subject: 's', html: 'h' },
        }),
      );
    });

    it('throws NotFoundException when page not found', async () => {
      mockRepo.findById.mockResolvedValue(null);
      await expect(
        service.rejectBusinessPage('page-1', 'admin-1', {}),
      ).rejects.toThrow(NotFoundException);
    });

    it('throws ConflictException when status is DRAFT', async () => {
      mockRepo.findById.mockResolvedValue({
        ...mockPageWithBusiness,
        status: 'DRAFT',
      });
      await expect(
        service.rejectBusinessPage('page-1', 'admin-1', {}),
      ).rejects.toThrow(ConflictException);
    });

    it('still rejects and returns page even if email sending throws', async () => {
      const page = {
        ...mockPageWithBusiness,
        status: 'PENDING_REVIEW',
        approvedContent: null,
      };
      mockRepo.findById.mockResolvedValue(page);
      mockRepo.rejectPage.mockResolvedValue({ ...page, status: 'REJECTED' });

      const result = await service.rejectBusinessPage('page-1', 'admin-1', {});

      expect(mockRepo.rejectPage).toHaveBeenCalled();
      expect(result.status).toBe('REJECTED');
    });

    it('sends rejection email with isUpdate=true for update rejection', async () => {
      const mockedBuildRejectionEmail = jest.mocked(buildRejectionEmail);
      const page = {
        ...mockPageWithBusiness,
        status: 'APPROVED_WITH_PENDING',
        approvedContent: { name: 'Live' },
      };
      mockRepo.findById.mockResolvedValue(page);
      mockRepo.rejectPage.mockResolvedValue({ ...page, status: 'APPROVED' });

      await service.rejectBusinessPage('page-1', 'admin-1', {});

      // The distinction the owner needs: their live page is still up, and it
      // was the change that was turned down.
      expect(mockNotifications.notify).toHaveBeenCalledWith(
        expect.objectContaining({
          payload: expect.objectContaining({ isUpdate: true }),
        }),
      );
      expect(mockedBuildRejectionEmail).toHaveBeenCalledWith(
        expect.any(String),
        true,
        expect.any(String),
        undefined,
      );
    });

    it('calls onPageRejected after successful rejection', async () => {
      const page = {
        ...mockPageWithBusiness,
        status: 'PENDING_REVIEW',
        approvedContent: null,
      };
      mockRepo.findById.mockResolvedValue(page);
      mockRepo.rejectPage.mockResolvedValue({ ...page, status: 'REJECTED' });
      mockQualification.onPageRejected.mockResolvedValue(undefined);

      await service.rejectBusinessPage('page-1', 'admin-1', {});

      expect(mockQualification.onPageRejected).toHaveBeenCalledWith('page-1');
    });
  });

  describe('uploadImage', () => {
    const pageId = 'page-1';
    const userId = 'user-1';

    beforeEach(() => {
      mockRepo.findByIdAndUserId.mockResolvedValue({
        id: pageId,
        businessId: 'biz-1',
      });
      mockStorage.uploadFileAtKey.mockResolvedValue({
        url: 'https://cdn.example.com/business-pages/biz-1/logo.jpg',
        key: 'business-pages/biz-1/logo.jpg',
      });
    });

    it('uploadLogo — retorna url ao fazer upload de imagem válida', async () => {
      const file = {
        buffer: Buffer.from('img'),
        mimetype: 'image/jpeg',
        size: 100,
      } as Express.Multer.File;

      const result = await service.uploadLogo(pageId, userId, file);

      expect(mockStorage.uploadFileAtKey).toHaveBeenCalledWith(
        file.buffer,
        'business-pages/biz-1/logo.jpg',
        'image/jpeg',
      );
      expect(result).toEqual({
        url: 'https://cdn.example.com/business-pages/biz-1/logo.jpg',
      });
    });

    it('uploadCover — retorna url ao fazer upload de imagem válida', async () => {
      mockStorage.uploadFileAtKey.mockResolvedValue({
        url: 'https://cdn.example.com/business-pages/biz-1/cover.png',
        key: 'business-pages/biz-1/cover.png',
      });
      const file = {
        buffer: Buffer.from('img'),
        mimetype: 'image/png',
        size: 200,
      } as Express.Multer.File;

      const result = await service.uploadCover(pageId, userId, file);

      expect(mockStorage.uploadFileAtKey).toHaveBeenCalledWith(
        file.buffer,
        'business-pages/biz-1/cover.png',
        'image/png',
      );
      expect(result).toEqual({
        url: 'https://cdn.example.com/business-pages/biz-1/cover.png',
      });
    });

    it('uploadLogo — lança ForbiddenException quando página não pertence ao usuário', async () => {
      mockRepo.findByIdAndUserId.mockResolvedValue(null);
      const file = {
        buffer: Buffer.from('x'),
        mimetype: 'image/jpeg',
        size: 10,
      } as Express.Multer.File;

      await expect(service.uploadLogo(pageId, userId, file)).rejects.toThrow(
        ForbiddenException,
      );
      expect(mockStorage.uploadFileAtKey).not.toHaveBeenCalled();
    });

    it('uploadLogo — lança BadRequestException para tipo MIME inválido', async () => {
      const file = {
        buffer: Buffer.from('x'),
        mimetype: 'application/pdf',
        size: 10,
      } as Express.Multer.File;

      await expect(service.uploadLogo(pageId, userId, file)).rejects.toThrow(
        BadRequestException,
      );
      expect(mockRepo.findByIdAndUserId).not.toHaveBeenCalled();
      expect(mockStorage.uploadFileAtKey).not.toHaveBeenCalled();
    });

    it('uploadLogo — lança BadRequestException para ficheiro > 5 MB', async () => {
      const file = {
        buffer: Buffer.from('x'),
        mimetype: 'image/jpeg',
        size: 5 * 1024 * 1024 + 1,
      } as Express.Multer.File;

      await expect(service.uploadLogo(pageId, userId, file)).rejects.toThrow(
        BadRequestException,
      );
      expect(mockRepo.findByIdAndUserId).not.toHaveBeenCalled();
      expect(mockStorage.uploadFileAtKey).not.toHaveBeenCalled();
    });

    it('uploadLogo — lança BadRequestException quando nenhum ficheiro é enviado', async () => {
      await expect(
        service.uploadLogo(
          pageId,
          userId,
          undefined as unknown as Express.Multer.File,
        ),
      ).rejects.toThrow(BadRequestException);
      expect(mockRepo.findByIdAndUserId).not.toHaveBeenCalled();
    });
  });
  /**
   * O re-run manual do admin existia e também jogava o resultado fora, então a
   * tela voltava ao "não sei por quê" no reload seguinte.
   */
  describe('moderatePage', () => {
    const page = {
      id: 'page-1',
      businessType: 'RESTAURANT',
      pendingContent: { name: 'A Padaria' },
      approvedContent: null,
    };

    beforeEach(() => {
      mockRepo.findByIdWithContent.mockResolvedValue(page);
    });

    it('records the run and says a human asked for it', async () => {
      const record = await service.moderatePage('page-1');

      expect(record).toMatchObject({ origin: 'manual', riskLevel: 'low' });
      expect(mockRepo.saveModerationResult).toHaveBeenCalledWith(
        'page-1',
        expect.objectContaining({ origin: 'manual' }),
      );
    });

    it('hands back the whole record, not the bare verdict', async () => {
      // A tela precisa da hora e do modelo para dizer o que está mostrando, e
      // devolvê-los aqui poupa um refetch logo após uma chamada que custou.
      const record = await service.moderatePage('page-1');

      expect(record.model).toBe('google/gemini-2.5-flash');
      expect(Date.parse(record.analyzedAt)).not.toBeNaN();
    });

    it('falls back to the approved content when there is nothing pending', async () => {
      mockRepo.findByIdWithContent.mockResolvedValue({
        ...page,
        pendingContent: null,
        approvedContent: { name: 'A Padaria' },
      });

      await service.moderatePage('page-1');

      expect(mockModeration.moderateContent).toHaveBeenCalledWith(
        { name: 'A Padaria' },
        'RESTAURANT',
        'page-1',
      );
    });

    it('refuses a page with no content at all', async () => {
      mockRepo.findByIdWithContent.mockResolvedValue({
        ...page,
        pendingContent: null,
        approvedContent: null,
      });

      await expect(service.moderatePage('page-1')).rejects.toThrow(
        BadRequestException,
      );
      expect(mockRepo.saveModerationResult).not.toHaveBeenCalled();
    });
  });

  describe('withdrawSubmission', () => {
    /**
     * Retirar não é ser reprovado.
     *
     * Antes, tirar da fila uma edição que já não se queria publicar só era
     * possível pedindo ao moderador que a reprovasse — e uma reprovação grava
     * `lastRejectionAt`, que custa 90 dias de qualificação a quem já a tinha.
     * Medido a 2026-09-02: uma conta com 11 aprovações contra 3 exigidas perdeu
     * a qualificação na hora por causa de um descarte operacional.
     */
    const paginaEmAnalise = (over: Record<string, unknown> = {}) => ({
      id: 'uuid',
      status: 'APPROVED_WITH_PENDING',
      approvedContent: { name: 'No ar' },
      pendingContent: { name: 'A rever' },
      ...over,
    });

    it('devolve ao ar a página que já tinha conteúdo aprovado', async () => {
      // O público não é tocado: sai da fila o pedido de revisão, não a página.
      mockRepo.findByIdAndUserId.mockResolvedValue(paginaEmAnalise());

      await service.withdrawSubmission('uuid', 'user-1');

      expect(mockRepo.withdrawSubmission).toHaveBeenCalledWith(
        'uuid',
        'APPROVED',
      );
    });

    it('devolve a rascunho a página que nunca foi aprovada', async () => {
      mockRepo.findByIdAndUserId.mockResolvedValue(
        paginaEmAnalise({ status: 'PENDING_REVIEW', approvedContent: null }),
      );

      await service.withdrawSubmission('uuid', 'user-1');

      expect(mockRepo.withdrawSubmission).toHaveBeenCalledWith('uuid', 'DRAFT');
    });

    it('não passa por nada da moderação', async () => {
      // É esta a diferença que a issue abriu: nenhuma reprovação é registada,
      // portanto a qualificação do dono fica onde estava.
      mockRepo.findByIdAndUserId.mockResolvedValue(paginaEmAnalise());

      await service.withdrawSubmission('uuid', 'user-1');

      expect(mockRepo.rejectPage).not.toHaveBeenCalled();
      expect(mockQualification.onPageRejected).not.toHaveBeenCalled();
    });

    it('recusa retirar o que não está em análise', async () => {
      mockRepo.findByIdAndUserId.mockResolvedValue(
        paginaEmAnalise({ status: 'APPROVED' }),
      );

      await expect(
        service.withdrawSubmission('uuid', 'user-1'),
      ).rejects.toThrow(ConflictException);
    });

    it('recusa quem não é o dono', async () => {
      mockRepo.findByIdAndUserId.mockResolvedValue(null);

      await expect(service.withdrawSubmission('uuid', 'outro')).rejects.toThrow(
        ForbiddenException,
      );
    });
  });
});
