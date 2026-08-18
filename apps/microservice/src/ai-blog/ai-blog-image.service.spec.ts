jest.mock('@app/database', () => ({
  PrismaService: jest.fn(),
  DatabaseModule: jest.fn(),
}));

jest.mock('@app/storage', () => ({
  StorageService: jest.fn(),
  StorageModule: jest.fn(),
}));

jest.mock('../../../../generated/prisma', () => ({
  BlogPipelineStatus: {
    TRANSLATING: 'TRANSLATING',
    GENERATING_IMAGE: 'GENERATING_IMAGE',
    READY: 'READY',
    FAILED_TRANSLATION: 'FAILED_TRANSLATION',
    FAILED_IMAGE: 'FAILED_IMAGE',
  },
  Prisma: { DbNull: Symbol('DbNull') },
}));

import { AiRouterService } from '@app/ai';
import { PrismaService } from '@app/database';
import { StorageService } from '@app/storage';
import { Test, TestingModule } from '@nestjs/testing';
import { AiBlogImageWorkerService } from './ai-blog-image.service';

const POST_ID = 'post-1';

const job = {
  postId: POST_ID,
  slug: 'como-imigrar',
  title: 'Como imigrar',
  countryName: 'Canada',
};

const mockPrisma = { blogPost: { update: jest.fn() } };
const mockStorage = { uploadFile: jest.fn() };
const mockAiRouter = { generateImage: jest.fn() };

describe('AiBlogImageWorkerService', () => {
  let service: AiBlogImageWorkerService;

  beforeEach(async () => {
    jest.clearAllMocks();
    mockStorage.uploadFile.mockResolvedValue({
      url: 'https://cdn.example/capa.jpg',
    });
    mockPrisma.blogPost.update.mockResolvedValue({});

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AiBlogImageWorkerService,
        { provide: PrismaService, useValue: mockPrisma },
        { provide: StorageService, useValue: mockStorage },
        { provide: AiRouterService, useValue: mockAiRouter },
      ],
    }).compile();

    service = module.get(AiBlogImageWorkerService);
  });

  it('gera pelo cenário de imagem e anexa a capa ao post', async () => {
    mockAiRouter.generateImage.mockResolvedValue({
      image: Buffer.from('jpeg'),
      model: 'bytedance-seed/seedream-5-0-lite',
      provider: 'openrouter',
      usage: { costUsd: 0.035 },
    });

    await service.generateAndAttachImage(job);

    expect(mockAiRouter.generateImage).toHaveBeenCalledWith(
      'blog_image',
      expect.any(String),
      expect.objectContaining({ entityType: 'blog_post', entityId: POST_ID }),
      // O upload logo abaixo declara `image/jpeg`; pedir o formato é o que torna
      // essa declaração verdadeira em vez de uma aposta no padrão do provider.
      { aspectRatio: '16:9', outputFormat: 'jpeg' },
    );
    expect(mockStorage.uploadFile).toHaveBeenCalledWith(
      Buffer.from('jpeg'),
      'como-imigrar.jpg',
      'image/jpeg',
      'blog',
    );
    // A capa é o último elo: com ela no lugar o post fica pronto para revisão, e
    // o erro de uma tentativa anterior deixa de valer.
    expect(mockPrisma.blogPost.update).toHaveBeenCalledWith({
      where: { id: POST_ID },
      data: {
        cover_image_url: 'https://cdn.example/capa.jpg',
        pipeline_status: 'READY',
        pipeline_error: expect.anything(),
      },
    });
  });

  it('propaga a falha da cadeia sem gravar capa pela metade', async () => {
    // Antes daqui não havia retry algum na capa — a primeira falha do Gemini
    // matava o job. Agora o roteador já tentou a cadeia inteira; deixar o erro
    // subir é o que devolve o job para o retry do BullMQ.
    mockAiRouter.generateImage.mockRejectedValue(
      new Error('Every model failed for "blog_image"'),
    );

    await expect(service.generateAndAttachImage(job)).rejects.toThrow(
      /Every model failed/,
    );
    expect(mockStorage.uploadFile).not.toHaveBeenCalled();
    expect(mockPrisma.blogPost.update).not.toHaveBeenCalled();
  });
});
