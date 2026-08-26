jest.mock('@app/database', () => ({
  PrismaService: jest.fn(),
  DatabaseModule: jest.fn(),
}));

jest.mock('@app/storage', () => ({
  StorageService: jest.fn(),
  StorageModule: jest.fn(),
}));

import { Test } from '@nestjs/testing';
import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { StorageService } from '@app/storage';
import { CommunityEventsService } from './community-events.service';
import { CommunityEventsRepository } from './community-events.repository';
import { COMMUNITY_EVENT_TERMS_VERSION } from './community-events.constants';
import type { CommunityEventWithCounts } from './community-events.repository';
import type { CreateCommunityEventDto } from './dto/create-community-event.dto';

const inDays = (days: number) => new Date(Date.now() + days * 86_400_000);

const baseEvent = {
  id: 'event-1',
  organizerId: 'user-1',
  slug: 'feira-de-artesanato-20260912',
  title: 'Feira de artesanato',
  description: 'Uma tarde de artesanato feito por imigrantes da cidade.',
  imageUrl: 'https://cdn.test/community-events/event-1/cover.jpg',
  category: 'FAIR',
  startsAt: inDays(7),
  endsAt: null,
  timezone: 'Europe/Lisbon',
  countryCode: 'PT',
  city: 'Lisbon',
  venueName: 'Mercado de Campo de Ourique',
  venueAddress: 'Rua Coelho da Rocha 104',
  lat: 38.7169,
  lng: -9.1662,
  businessId: null,
  contactEmail: 'eventos@exemplo.pt',
  contactPhone: null,
  isFree: true,
  priceNote: null,
  externalUrl: null,
  minAge: null,
  termsVersion: COMMUNITY_EVENT_TERMS_VERSION,
  termsAcceptedAt: new Date(),
  status: 'DRAFT',
  submittedAt: null,
  approvedAt: null,
  approvedById: null,
  rejectedAt: null,
  rejectedById: null,
  rejectionReason: null,
  createdAt: new Date(),
  updatedAt: new Date(),
  _count: { reports: 0 },
} as unknown as CommunityEventWithCounts;

const eventWith = (
  overrides: Partial<CommunityEventWithCounts> & Record<string, unknown>,
): CommunityEventWithCounts =>
  ({ ...baseEvent, ...overrides }) as CommunityEventWithCounts;

const validCreateDto = (
  overrides: Partial<CreateCommunityEventDto> = {},
): CreateCommunityEventDto =>
  ({
    title: 'Feira de artesanato',
    description: 'Uma tarde de artesanato feito por imigrantes da cidade.',
    category: 'FAIR',
    startsAt: inDays(7).toISOString(),
    timezone: 'Europe/Lisbon',
    countryCode: 'PT',
    city: 'Lisbon',
    venueName: 'Mercado de Campo de Ourique',
    venueAddress: 'Rua Coelho da Rocha 104',
    lat: 38.7169,
    lng: -9.1662,
    contactEmail: 'eventos@exemplo.pt',
    isFree: true,
    acceptTerms: true,
    termsVersion: COMMUNITY_EVENT_TERMS_VERSION,
    ...overrides,
  }) as CreateCommunityEventDto;

/**
 * A plain object rather than `jest.Mocked<CommunityEventsRepository>`: the
 * typed form makes every `expect(repository.x)` read as an unbound class
 * method, which the lint rules reject. Same shape either way.
 */
const buildRepository = () => ({
  isSlugTaken: jest.fn().mockResolvedValue(false),
  countPendingByOrganizer: jest.fn().mockResolvedValue(0),
  create: jest.fn().mockResolvedValue(baseEvent),
  findByIdAndOrganizer: jest.fn().mockResolvedValue(baseEvent),
  findById: jest.fn().mockResolvedValue(baseEvent),
  findByIdWithReports: jest.fn(),
  update: jest
    .fn()
    .mockImplementation((id: string, data: Record<string, unknown>) =>
      Promise.resolve(eventWith({ ...data, id })),
    ),
  listByOrganizer: jest.fn(),
  listForAdmin: jest.fn(),
  findApprovedBySlug: jest.fn(),
  findApprovedIdBySlug: jest.fn().mockResolvedValue({ id: 'event-1' }),
  listPublicUpcoming: jest.fn(),
  listPublicByWhen: jest.fn(),
  createReport: jest.fn().mockResolvedValue({ id: 'report-1' }),
  findBusinessForEvent: jest.fn(),
});

describe('CommunityEventsService', () => {
  let service: CommunityEventsService;
  let repository: ReturnType<typeof buildRepository>;
  let storage: { uploadFileAtKey: jest.Mock };

  beforeEach(async () => {
    repository = buildRepository();
    storage = { uploadFileAtKey: jest.fn() };

    const moduleRef = await Test.createTestingModule({
      providers: [
        CommunityEventsService,
        { provide: CommunityEventsRepository, useValue: repository },
        { provide: StorageService, useValue: storage },
      ],
    }).compile();

    service = moduleRef.get(CommunityEventsService);
  });

  describe('create', () => {
    it('refuses an acceptance of a superseded version of the terms', async () => {
      await expect(
        service.create(
          'user-1',
          validCreateDto({ termsVersion: '2020-01-01' }),
        ),
      ).rejects.toThrow(BadRequestException);

      expect(repository.create).not.toHaveBeenCalled();
    });

    it('refuses an organizer who already fills the review queue', async () => {
      repository.countPendingByOrganizer.mockResolvedValue(5);

      await expect(service.create('user-1', validCreateDto())).rejects.toThrow(
        ConflictException,
      );
    });

    it('refuses a business that is in another city', async () => {
      repository.findBusinessForEvent.mockResolvedValue({
        id: 'biz-1',
        isPublic: true,
        city: 'Porto',
      });

      await expect(
        service.create('user-1', validCreateDto({ businessId: 'biz-1' })),
      ).rejects.toThrow(BadRequestException);
    });

    it('refuses an event nobody can be contacted about', async () => {
      await expect(
        service.create(
          'user-1',
          validCreateDto({ contactEmail: undefined, contactPhone: undefined }),
        ),
      ).rejects.toThrow(BadRequestException);
    });

    it('stores the accepted version and the moment it was accepted', async () => {
      await service.create('user-1', validCreateDto());

      const written = repository.create.mock.calls[0][0];
      expect(written.termsVersion).toBe(COMMUNITY_EVENT_TERMS_VERSION);
      expect(written.termsAcceptedAt).toBeInstanceOf(Date);
      expect(written.status).toBe('DRAFT');
      expect(written.slug).toMatch(/-\d{8}$/);
    });

    it('drops a price note on a free event', async () => {
      await service.create(
        'user-1',
        validCreateDto({ isFree: true, priceNote: '10 €' }),
      );

      expect(repository.create.mock.calls[0][0].priceNote).toBeNull();
    });
  });

  describe('ownership', () => {
    it('answers 403, not 404, for an event of somebody else', async () => {
      repository.findByIdAndOrganizer.mockResolvedValue(null);

      await expect(service.getMine('event-1', 'user-2')).rejects.toThrow(
        ForbiddenException,
      );
    });
  });

  describe('submit', () => {
    it('refuses an event without a cover image', async () => {
      repository.findByIdAndOrganizer.mockResolvedValue(
        eventWith({ imageUrl: null }),
      );

      await expect(service.submit('event-1', 'user-1')).rejects.toThrow(
        UnprocessableEntityException,
      );
    });

    it('refuses an event already in review', async () => {
      repository.findByIdAndOrganizer.mockResolvedValue(
        eventWith({ status: 'PENDING_REVIEW' }),
      );

      await expect(service.submit('event-1', 'user-1')).rejects.toThrow(
        ConflictException,
      );
    });

    it('clears the previous rejection when a fixed event is resubmitted', async () => {
      repository.findByIdAndOrganizer.mockResolvedValue(
        eventWith({
          status: 'REJECTED',
          rejectedAt: new Date(),
          rejectionReason: 'imagem errada',
        }),
      );

      await service.submit('event-1', 'user-1');

      expect(repository.update).toHaveBeenCalledWith(
        'event-1',
        expect.objectContaining({
          status: 'PENDING_REVIEW',
          rejectionReason: null,
        }),
      );
    });
  });

  describe('update', () => {
    it('sends an approved event back to review', async () => {
      repository.findByIdAndOrganizer.mockResolvedValue(
        eventWith({
          status: 'APPROVED',
          approvedAt: new Date(),
          approvedById: 'admin-1',
        }),
      );

      await service.update('event-1', 'user-1', { title: 'Outro título' });

      expect(repository.update).toHaveBeenCalledWith(
        'event-1',
        expect.objectContaining({
          status: 'PENDING_REVIEW',
          approvedAt: null,
          approvedById: null,
        }),
      );
    });

    it('keeps the slug of an event that has already been public', async () => {
      repository.findByIdAndOrganizer.mockResolvedValue(
        eventWith({ status: 'APPROVED' }),
      );

      await service.update('event-1', 'user-1', { title: 'Outro título' });

      expect(repository.update.mock.calls[0][1].slug).toBe(baseEvent.slug);
    });

    it('regenerates the slug of a draft whose title changed', async () => {
      await service.update('event-1', 'user-1', { title: 'Outro título' });

      expect(repository.update.mock.calls[0][1].slug).toMatch(
        /^outro-titulo-\d{8}$/,
      );
    });

    it('refuses to edit an event under review', async () => {
      repository.findByIdAndOrganizer.mockResolvedValue(
        eventWith({ status: 'PENDING_REVIEW' }),
      );

      await expect(
        service.update('event-1', 'user-1', { title: 'Outro' }),
      ).rejects.toThrow(ConflictException);
    });

    it('refuses to edit a cancelled event', async () => {
      repository.findByIdAndOrganizer.mockResolvedValue(
        eventWith({ status: 'CANCELLED' }),
      );

      await expect(
        service.update('event-1', 'user-1', { title: 'Outro' }),
      ).rejects.toThrow(ConflictException);
    });

    it('refuses an edit that leaves the event without any contact', async () => {
      await expect(
        service.update('event-1', 'user-1', { contactEmail: undefined }),
      ).resolves.toBeDefined();

      await expect(
        service.update('event-1', 'user-1', {
          contactEmail: '',
          contactPhone: '',
        }),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('image', () => {
    it('writes a deterministic key and sends an approved event back to review', async () => {
      repository.findByIdAndOrganizer.mockResolvedValue(
        eventWith({ status: 'APPROVED' }),
      );
      storage.uploadFileAtKey.mockResolvedValue({
        url: 'https://cdn.test/community-events/event-1/cover.jpg',
      });

      await service.uploadImage('event-1', 'user-1', {
        mimetype: 'image/jpeg',
        size: 1024,
        buffer: Buffer.from('x'),
      } as Express.Multer.File);

      expect(storage.uploadFileAtKey).toHaveBeenCalledWith(
        expect.anything(),
        'community-events/event-1/cover.jpg',
        'image/jpeg',
      );
      expect(repository.update).toHaveBeenCalledWith(
        'event-1',
        expect.objectContaining({ status: 'PENDING_REVIEW', approvedAt: null }),
      );
    });

    it('refuses a file type that is not an image we serve', async () => {
      await expect(
        service.uploadImage('event-1', 'user-1', {
          mimetype: 'application/pdf',
          size: 1024,
          buffer: Buffer.from('x'),
        } as Express.Multer.File),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('cancel', () => {
    it('takes the event off the public list', async () => {
      await service.cancel('event-1', 'user-1');

      expect(repository.update).toHaveBeenCalledWith('event-1', {
        status: 'CANCELLED',
      });
    });

    it('refuses to cancel twice', async () => {
      repository.findByIdAndOrganizer.mockResolvedValue(
        eventWith({ status: 'CANCELLED' }),
      );

      await expect(service.cancel('event-1', 'user-1')).rejects.toThrow(
        ConflictException,
      );
    });
  });

  describe('moderation', () => {
    it('approves only what is under review', async () => {
      repository.findById.mockResolvedValue(eventWith({ status: 'APPROVED' }));

      await expect(service.approve('event-1', 'admin-1')).rejects.toThrow(
        ConflictException,
      );
    });

    it('records who approved and when', async () => {
      repository.findById.mockResolvedValue(
        eventWith({ status: 'PENDING_REVIEW' }),
      );

      await service.approve('event-1', 'admin-1');

      expect(repository.update).toHaveBeenCalledWith(
        'event-1',
        expect.objectContaining({
          status: 'APPROVED',
          approvedById: 'admin-1',
        }),
      );
    });

    it('takes an already approved event down, with the reason', async () => {
      repository.findById.mockResolvedValue(
        eventWith({ status: 'APPROVED', approvedAt: new Date() }),
      );

      await service.reject('event-1', 'admin-1', { reason: 'Denúncia válida' });

      expect(repository.update).toHaveBeenCalledWith(
        'event-1',
        expect.objectContaining({
          status: 'REJECTED',
          rejectionReason: 'Denúncia válida',
          approvedAt: null,
        }),
      );
    });

    it('refuses to reject an event that was never submitted', async () => {
      repository.findById.mockResolvedValue(eventWith({ status: 'DRAFT' }));

      await expect(
        service.reject('event-1', 'admin-1', { reason: 'x' }),
      ).rejects.toThrow(ConflictException);
    });

    it('answers 404 for an event that does not exist', async () => {
      repository.findByIdWithReports.mockResolvedValue(null);

      await expect(service.getForAdmin('nope')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('report', () => {
    it('drops a honeypot submission without telling the bot', async () => {
      const answer = await service.report('feira-20260912', {
        reason: 'qualquer coisa suficientemente longa',
        website: 'http://spam.example',
      });

      expect(answer).toEqual({ received: true });
      expect(repository.createReport).not.toHaveBeenCalled();
      expect(repository.findApprovedIdBySlug).not.toHaveBeenCalled();
    });

    it('stores a real report against the approved event', async () => {
      await service.report('feira-20260912', {
        reason: 'O evento não existe no endereço indicado.',
      });

      expect(repository.createReport).toHaveBeenCalledWith(
        'event-1',
        'O evento não existe no endereço indicado.',
      );
    });

    it('does not admit that an unapproved event exists', async () => {
      repository.findApprovedIdBySlug.mockResolvedValue(null);

      await expect(
        service.report('rascunho', { reason: 'dez caracteres pelo menos' }),
      ).rejects.toThrow(NotFoundException);
    });
  });
});
