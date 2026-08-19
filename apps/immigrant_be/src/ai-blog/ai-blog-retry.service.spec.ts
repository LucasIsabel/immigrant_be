jest.mock('@app/database', () => ({
  PrismaService: jest.fn(),
  DatabaseModule: jest.fn(),
}));

jest.mock('../../../../generated/prisma', () => ({
  BlogPostStatus: { DRAFT: 'DRAFT', PUBLISHED: 'PUBLISHED' },
  BlogPipelineStatus: {
    TRANSLATING: 'TRANSLATING',
    GENERATING_IMAGE: 'GENERATING_IMAGE',
    READY: 'READY',
    FAILED_TRANSLATION: 'FAILED_TRANSLATION',
    FAILED_IMAGE: 'FAILED_IMAGE',
  },
  Prisma: { DbNull: Symbol('DbNull') },
}));

import {
  AI_BLOG_IMAGE_QUEUE,
  AI_BLOG_QUEUE,
  BLOG_TRANSLATION_QUEUE,
  GENERATE_AI_BLOG_IMAGE,
} from '@app/config/constants';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { getQueueToken } from '@nestjs/bullmq';
import { Test, TestingModule } from '@nestjs/testing';
import { AiBlogRepository } from './ai-blog.repository';
import { AiBlogService } from './ai-blog.service';
import { BlogService } from '../blog/blog.service';
import { BlogPersonasService } from '../blog-personas/blog-personas.service';

const POST_ID = 'post-1';

const post = (pipeline_status: string) => ({
  id: POST_ID,
  slug: 'como-imigrar',
  title: 'Como imigrar',
  pipeline_status,
  featured_country: { name: 'Canadá' },
});

const mockRepo = {
  findPostById: jest.fn(),
  setPipelineStatus: jest.fn(),
  findTranslationLocalesForPost: jest.fn(),
};

const imageQueue = { add: jest.fn() };
const translationQueue = { addBulk: jest.fn() };
const blogQueue = { add: jest.fn() };

describe('AiBlogService.retryFailedStep', () => {
  let service: AiBlogService;

  beforeEach(async () => {
    jest.clearAllMocks();
    mockRepo.setPipelineStatus.mockResolvedValue({});
    mockRepo.findTranslationLocalesForPost.mockResolvedValue([]);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AiBlogService,
        { provide: AiBlogRepository, useValue: mockRepo },
        { provide: BlogService, useValue: {} },
        { provide: BlogPersonasService, useValue: {} },
        { provide: getQueueToken(AI_BLOG_QUEUE), useValue: blogQueue },
        { provide: getQueueToken(AI_BLOG_IMAGE_QUEUE), useValue: imageQueue },
        {
          provide: getQueueToken(BLOG_TRANSLATION_QUEUE),
          useValue: translationQueue,
        },
      ],
    }).compile();

    service = module.get(AiBlogService);
  });

  it('repete só a imagem quando foi a imagem que falhou', async () => {
    mockRepo.findPostById.mockResolvedValue(post('FAILED_IMAGE'));

    const result = await service.retryFailedStep(POST_ID, 'user-1');

    expect(result).toEqual({ step: 'cover_image' });
    expect(imageQueue.add).toHaveBeenCalledWith(
      GENERATE_AI_BLOG_IMAGE,
      expect.objectContaining({ postId: POST_ID, countryName: 'Canadá' }),
    );
    // O texto e as traduções já estão prontos; refazê-los seria pagar de novo.
    expect(translationQueue.addBulk).not.toHaveBeenCalled();
    expect(blogQueue.add).not.toHaveBeenCalled();
  });

  it('repete só os idiomas que faltam', async () => {
    // Traduzir de novo o que já veio pagaria duas vezes pela mesma tradução.
    mockRepo.findPostById.mockResolvedValue(post('FAILED_TRANSLATION'));
    mockRepo.findTranslationLocalesForPost.mockResolvedValue(['pt']);

    const result = await service.retryFailedStep(POST_ID, 'user-1');

    expect(result).toEqual({ step: 'translation', locales: ['es'] });
    const [jobs] = translationQueue.addBulk.mock.calls[0] as [
      Array<{ data: { targetLocale: string } }>,
    ];
    expect(jobs.map((j) => j.data.targetLocale)).toEqual(['es']);
  });

  it('recoloca o post na etapa antes de reenfileirar', async () => {
    // Sem isto o post ficaria em FAILED_* enquanto o job roda, e a tela
    // mostraria falha em cima de trabalho em andamento.
    mockRepo.findPostById.mockResolvedValue(post('FAILED_IMAGE'));

    await service.retryFailedStep(POST_ID);

    expect(mockRepo.setPipelineStatus).toHaveBeenCalledWith(
      POST_ID,
      'GENERATING_IMAGE',
    );
  });

  it('repete a capa quando ficou travada em GENERATING_IMAGE', async () => {
    mockRepo.findPostById.mockResolvedValue(post('GENERATING_IMAGE'));

    const result = await service.retryFailedStep(POST_ID, 'user-1');

    expect(result).toEqual({ step: 'cover_image' });
    expect(imageQueue.add).toHaveBeenCalledWith(
      GENERATE_AI_BLOG_IMAGE,
      expect.objectContaining({ postId: POST_ID }),
    );
  });

  it.each([
    ['READY', 'um post pronto'],
    ['TRANSLATING', 'uma etapa em andamento'],
  ])('recusa repetir %s', async (status) => {
    // É o que um clique repetido na tela produz. Reenfileirar criaria trabalho
    // duplicado — e, na imagem, uma segunda geração paga.
    mockRepo.findPostById.mockResolvedValue(post(status));

    await expect(service.retryFailedStep(POST_ID)).rejects.toBeInstanceOf(
      ConflictException,
    );
    expect(imageQueue.add).not.toHaveBeenCalled();
    expect(translationQueue.addBulk).not.toHaveBeenCalled();
  });

  it('404 quando o post não existe', async () => {
    mockRepo.findPostById.mockResolvedValue(null);

    await expect(service.retryFailedStep('sumiu')).rejects.toBeInstanceOf(
      NotFoundException,
    );
  });
});
