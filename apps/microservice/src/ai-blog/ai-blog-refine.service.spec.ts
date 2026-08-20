jest.mock('@app/database', () => ({
  PrismaService: jest.fn(),
  DatabaseModule: jest.fn(),
}));

jest.mock('@app/storage', () => ({
  StorageService: jest.fn(),
  StorageModule: jest.fn(),
}));

import { AiRouterService } from '@app/ai';
import { PrismaService } from '@app/database';
import { StorageService } from '@app/storage';
import { Test, TestingModule } from '@nestjs/testing';
import { AiBlogRefineService } from './ai-blog-refine.service';

const POST_ID = 'post-1';

const marker = (description: string) =>
  `> 📊 **[Visual sugerido]:** ${description}`;

const contentWith = (...descriptions: string[]) =>
  ['# Título', '', ...descriptions.map(marker), '', 'Fim.'].join('\n');

const mockPrisma = {
  blogPost: { findUnique: jest.fn(), update: jest.fn() },
  blogPostTranslation: { findMany: jest.fn(), update: jest.fn() },
};

const mockStorage = { uploadFile: jest.fn() };
const mockAiRouter = { generateImage: jest.fn() };

describe('AiBlogRefineService', () => {
  let service: AiBlogRefineService;

  beforeEach(async () => {
    jest.clearAllMocks();

    mockPrisma.blogPost.findUnique.mockResolvedValue({
      id: POST_ID,
      content: contentWith('Gráfico de vistos aprovados por ano'),
    });
    mockPrisma.blogPost.update.mockResolvedValue({});
    mockPrisma.blogPostTranslation.findMany.mockResolvedValue([]);
    mockStorage.uploadFile.mockResolvedValue({
      url: 'https://cdn.example/ilustracao.jpg',
    });
    mockAiRouter.generateImage.mockResolvedValue({
      image: Buffer.from('jpeg-bytes'),
      model: 'bytedance-seed/seedream-5-0-lite',
      provider: 'openrouter',
      usage: { costUsd: 0.035 },
    });

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AiBlogRefineService,
        { provide: PrismaService, useValue: mockPrisma },
        { provide: StorageService, useValue: mockStorage },
        { provide: AiRouterService, useValue: mockAiRouter },
      ],
    }).compile();

    service = module.get(AiBlogRefineService);
  });

  it('pede jpeg 16:9, que é o que o upload declara logo abaixo', async () => {
    // O upload nomeia `.jpg` e declara `image/jpeg`, mas o formato nunca era
    // pedido: os bytes vinham no padrão do provider, que é PNG. O navegador
    // farejava o conteúdo e renderizava, então o defeito nunca apareceu como
    // erro — só como Content-Type mentiroso num arquivo maior que o necessário.
    //
    // A proporção existe pelo mesmo motivo da capa: sem pedir, o padrão é
    // quadrado, e cada marcador sairia com o formato que o modelo escolhesse.
    await service.refinePost({ postId: POST_ID });

    expect(mockAiRouter.generateImage).toHaveBeenCalledWith(
      'blog_image',
      expect.any(String),
      expect.objectContaining({ entityType: 'blog_post', entityId: POST_ID }),
      { aspectRatio: '16:9', outputFormat: 'jpeg' },
    );

    expect(mockStorage.uploadFile).toHaveBeenCalledWith(
      Buffer.from('jpeg-bytes'),
      expect.stringMatching(/\.jpg$/),
      'image/jpeg',
      'blog',
    );
  });

  it('proíbe texto legível no prompt da imagem (compartilhada nos 3 idiomas)', async () => {
    // Uma única JPEG é reusada em en/pt/es. Qualquer rótulo na imagem ficaria
    // em inglês nas traduções — melhor não pedir letra nenhuma.
    await service.refinePost({ postId: POST_ID });

    const [, prompt] = mockAiRouter.generateImage.mock.calls[0] as [
      string,
      string,
    ];
    expect(prompt).toMatch(/No readable text/i);
  });

  it('mantém a geometria igual em todos os marcadores do mesmo post', async () => {
    // Ilustrações de proporções diferentes dentro de um artigo denunciam que
    // cada uma saiu de uma decisão do modelo, não do editor.
    mockPrisma.blogPost.findUnique.mockResolvedValue({
      id: POST_ID,
      content: contentWith('Primeiro gráfico', 'Segundo gráfico'),
    });

    await service.refinePost({ postId: POST_ID });

    expect(mockAiRouter.generateImage).toHaveBeenCalledTimes(2);
    const geometrias = mockAiRouter.generateImage.mock.calls.map(
      (call) => call[3] as unknown,
    );
    expect(geometrias).toEqual([
      { aspectRatio: '16:9', outputFormat: 'jpeg' },
      { aspectRatio: '16:9', outputFormat: 'jpeg' },
    ]);
  });

  it('marca revisão manual quando um marcador falha, sem derrubar os outros', async () => {
    // Uma imagem que não sai não pode custar as que saíram: o post fica
    // publicável e sinalizado, em vez de voltar inteiro para a fila.
    mockPrisma.blogPost.findUnique.mockResolvedValue({
      id: POST_ID,
      content: contentWith('Vai falhar', 'Vai funcionar'),
    });
    mockAiRouter.generateImage
      .mockRejectedValueOnce(new Error('Every model failed for "blog_image"'))
      .mockResolvedValueOnce({
        image: Buffer.from('jpeg-bytes'),
        model: 'bytedance-seed/seedream-5-0-lite',
        provider: 'openrouter',
        usage: {},
      });

    const result = await service.refinePost({ postId: POST_ID });

    expect(result).toMatchObject({
      allGenerated: false,
      generated: 1,
      total: 2,
    });
    expect(mockPrisma.blogPost.update).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({ refine_needs_manual_fix: true }),
      }),
    );
  });

  it('não chama modelo nenhum quando o post não tem marcador', async () => {
    mockPrisma.blogPost.findUnique.mockResolvedValue({
      id: POST_ID,
      content: '# Só texto\n\nSem visual sugerido aqui.',
    });

    const result = await service.refinePost({ postId: POST_ID });

    expect(result).toMatchObject({
      allGenerated: true,
      generated: 0,
      total: 0,
    });
    expect(mockAiRouter.generateImage).not.toHaveBeenCalled();
  });
});
