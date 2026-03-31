import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { StorageService } from './storage.service';

const mockSend = jest.fn();

jest.mock('@aws-sdk/client-s3', () => ({
  ...jest.requireActual('@aws-sdk/client-s3'),
  S3Client: jest.fn().mockImplementation(() => ({
    send: mockSend,
  })),
}));

describe('StorageService', () => {
  let service: StorageService;

  const mockConfig = {
    CLOUDFLARE_R2_ACCOUNT_ID: 'account-id',
    CLOUDFLARE_R2_ACCESS_KEY_ID: 'access-key',
    CLOUDFLARE_R2_SECRET_ACCESS_KEY: 'secret-key',
    CLOUDFLARE_R2_BUCKET_NAME: 'test-bucket',
    CLOUDFLARE_R2_PUBLIC_URL: 'https://cdn.example.com',
    CLOUDFLARE_ENDPOINT: 'https://accountid.r2.cloudflarestorage.com',
  };

  beforeEach(async () => {
    mockSend.mockResolvedValue({});

    const configService = {
      getOrThrow: jest.fn(
        (key: string) => mockConfig[key as keyof typeof mockConfig],
      ),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StorageService,
        { provide: ConfigService, useValue: configService },
      ],
    }).compile();

    service = module.get<StorageService>(StorageService);
    jest.clearAllMocks();
    mockSend.mockResolvedValue({});
  });

  describe('uploadFile', () => {
    it('deve fazer upload e retornar url e key com extensão do nome original', async () => {
      const buffer = Buffer.from('test');

      const result = await service.uploadFile(
        buffer,
        'foto.jpg',
        'image/jpeg',
        'blog-covers',
      );

      expect(result.key).toMatch(/^blog-covers\/[a-f0-9-]+\.jpg$/);
      expect(result.url).toBe(`https://cdn.example.com/${result.key}`);

      expect(mockSend).toHaveBeenCalledTimes(1);
      const [command] = mockSend.mock.calls[0] as [PutObjectCommand];
      expect(command.input).toMatchObject({
        Bucket: 'test-bucket',
        Body: buffer,
        ContentType: 'image/jpeg',
      });
      expect(command.input.Key).toMatch(/^blog-covers\/[a-f0-9-]+\.jpg$/);
    });

    it('deve usar mimeToExt quando originalName não tem extensão', async () => {
      const buffer = Buffer.from('test');

      const result = await service.uploadFile(
        buffer,
        'sem-extensao',
        'image/png',
        'images',
      );

      expect(result.key).toMatch(/^images\/[a-f0-9-]+\.png$/);
      expect(mockSend).toHaveBeenCalledTimes(1);
      const [command] = mockSend.mock.calls[0] as [PutObjectCommand];
      expect(command.input.ContentType).toBe('image/png');
      expect(command.input.Key).toMatch(/\.png$/);
    });

    it('deve passar buffer e contentType corretos para o S3', async () => {
      const buffer = Buffer.from('conteudo-pdf');

      await service.uploadFile(buffer, 'doc.pdf', 'application/pdf', 'docs');

      const [command] = mockSend.mock.calls[0] as [PutObjectCommand];
      expect(command.input.Body).toBe(buffer);
      expect(command.input.ContentType).toBe('application/pdf');
      expect(command.input.Bucket).toBe('test-bucket');
    });

    it('deve construir key no formato folder/uuid.ext e url com publicUrl', async () => {
      const result = await service.uploadFile(
        Buffer.from('x'),
        'img.webp',
        'image/webp',
        'custom-folder',
      );

      expect(result.key).toMatch(/^custom-folder\/[a-f0-9-]+\.webp$/);
      expect(result.url).toBe(`https://cdn.example.com/${result.key}`);
    });

    it('deve propagar erro quando S3.send falhar', async () => {
      mockSend.mockRejectedValueOnce(new Error('S3 connection failed'));

      await expect(
        service.uploadFile(Buffer.from('x'), 'a.jpg', 'image/jpeg', 'folder'),
      ).rejects.toThrow('S3 connection failed');
    });
  });

  describe('uploadFileAtKey', () => {
    it('deve fazer upload com a key fornecida e retornar url e key', async () => {
      const buffer = Buffer.from('test');
      const result = await service.uploadFileAtKey(
        buffer,
        'business-pages/biz-1/logo.jpg',
        'image/jpeg',
      );

      expect(result.key).toBe('business-pages/biz-1/logo.jpg');
      expect(result.url).toBe(
        'https://cdn.example.com/business-pages/biz-1/logo.jpg',
      );

      expect(mockSend).toHaveBeenCalledTimes(1);
      const [command] = mockSend.mock.calls[0] as [PutObjectCommand];
      expect(command.input).toMatchObject({
        Bucket: 'test-bucket',
        Key: 'business-pages/biz-1/logo.jpg',
        Body: buffer,
        ContentType: 'image/jpeg',
      });
    });

    it('deve propagar erro quando S3.send falhar', async () => {
      mockSend.mockRejectedValueOnce(new Error('S3 error'));
      await expect(
        service.uploadFileAtKey(Buffer.from('x'), 'some/key.png', 'image/png'),
      ).rejects.toThrow('S3 error');
    });
  });
});
