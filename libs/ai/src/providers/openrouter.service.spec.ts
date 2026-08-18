import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { OpenRouterService } from './openrouter.service';
import { AiProviderError, InsufficientCreditsError } from './ai-provider.types';

const config = (values: Record<string, string | undefined>) => ({
  get: (key: string) => values[key],
});

const jsonResponse = (
  body: unknown,
  init: { status?: number; headers?: Record<string, string> } = {},
) =>
  new Response(JSON.stringify(body), {
    status: init.status ?? 200,
    headers: { 'Content-Type': 'application/json', ...(init.headers ?? {}) },
  });

const build = async (
  values: Record<string, string | undefined> = { OPEN_ROUTER: 'test-key' },
) => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      OpenRouterService,
      { provide: ConfigService, useValue: config(values) },
    ],
  }).compile();

  return module.get(OpenRouterService);
};

describe('OpenRouterService', () => {
  let fetchMock: jest.SpyInstance;

  beforeEach(() => {
    fetchMock = jest.spyOn(global, 'fetch');
  });

  afterEach(() => {
    fetchMock.mockRestore();
  });

  describe('api key', () => {
    it('lê OPEN_ROUTER, o nome que está no ambiente', async () => {
      const service = await build({ OPEN_ROUTER: 'from-env-var' });
      fetchMock.mockResolvedValue(
        jsonResponse({ choices: [{ message: { content: 'hi' } }] }),
      );

      await service.generateText('some/model', 'prompt');

      const headers = (fetchMock.mock.calls[0][1] as RequestInit)
        .headers as Record<string, string>;
      expect(headers.Authorization).toBe('Bearer from-env-var');
    });

    it('falha ao ser construído quando a chave não existe', async () => {
      // O envSchema já barra isto no boot; a guarda no construtor existe para o
      // invariante viver junto de quem depende dele, como no GeminiBaseService.
      await expect(build({})).rejects.toThrow('OPEN_ROUTER is not configured');
      expect(fetchMock).not.toHaveBeenCalled();
    });
  });

  describe('generateText', () => {
    it('returns the message, the model that answered and the reported cost', async () => {
      const service = await build();
      fetchMock.mockResolvedValue(
        jsonResponse({
          model: 'anthropic/claude-sonnet-5',
          choices: [{ message: { content: 'the column' } }],
          usage: { prompt_tokens: 100, completion_tokens: 500, cost: 0.0052 },
        }),
      );

      const result = await service.generateText(
        'anthropic/claude-sonnet-5',
        'p',
      );

      expect(result).toMatchObject({
        text: 'the column',
        model: 'anthropic/claude-sonnet-5',
        provider: 'openrouter',
        usage: { inputTokens: 100, outputTokens: 500, costUsd: 0.0052 },
      });
    });

    it('asks OpenRouter to report usage', async () => {
      const service = await build();
      fetchMock.mockResolvedValue(
        jsonResponse({ choices: [{ message: { content: 'x' } }] }),
      );

      await service.generateText('m', 'p');

      const body = JSON.parse(
        (fetchMock.mock.calls[0][1] as RequestInit).body as string,
      );
      expect(body.usage).toEqual({ include: true });
    });

    it('leaves cost undefined when the provider does not report it', async () => {
      const service = await build();
      fetchMock.mockResolvedValue(
        jsonResponse({ choices: [{ message: { content: 'x' } }] }),
      );

      const result = await service.generateText('m', 'p');

      // An estimate here would end up in ai_usage_logs as if it were real.
      expect(result.usage.costUsd).toBeUndefined();
    });

    it('maps 402 to InsufficientCreditsError', async () => {
      const service = await build();
      fetchMock.mockResolvedValue(
        jsonResponse({ error: 'no credit' }, { status: 402 }),
      );

      await expect(service.generateText('m', 'p')).rejects.toBeInstanceOf(
        InsufficientCreditsError,
      );
    });

    it('maps 429 to RateLimitedError and reads Retry-After as seconds', async () => {
      const service = await build();
      fetchMock.mockResolvedValue(
        jsonResponse({}, { status: 429, headers: { 'retry-after': '3' } }),
      );

      await expect(service.generateText('m', 'p')).rejects.toMatchObject({
        name: 'RateLimitedError',
        retryAfterMs: 3000,
      });
    });

    it('leaves retryAfterMs undefined for a non-numeric Retry-After', async () => {
      const service = await build();
      fetchMock.mockResolvedValue(
        jsonResponse(
          {},
          {
            status: 429,
            headers: { 'retry-after': 'Wed, 21 Oct 2026 07:28:00 GMT' },
          },
        ),
      );

      // Guessing a wait from a date is worse than moving to the next model.
      await expect(service.generateText('m', 'p')).rejects.toMatchObject({
        retryAfterMs: undefined,
      });
    });

    it('treats other statuses as a generic provider error', async () => {
      const service = await build();
      fetchMock.mockResolvedValue(jsonResponse({}, { status: 503 }));

      await expect(service.generateText('m', 'p')).rejects.toMatchObject({
        name: 'AiProviderError',
        status: 503,
      });
    });

    it('errors when the response has no content instead of returning empty text', async () => {
      const service = await build();
      fetchMock.mockResolvedValue(jsonResponse({ choices: [] }));

      await expect(service.generateText('m', 'p')).rejects.toThrow(
        AiProviderError,
      );
    });
  });

  describe('generateImage', () => {
    it('decodes inline base64', async () => {
      const service = await build();
      fetchMock.mockResolvedValue(
        jsonResponse({
          model: 'bytedance/seedream-4.5',
          data: [{ b64_json: Buffer.from('png-bytes').toString('base64') }],
        }),
      );

      const result = await service.generateImage('bytedance/seedream-4.5', 'p');

      expect(result.image.toString()).toBe('png-bytes');
      expect(result.model).toBe('bytedance/seedream-4.5');
    });

    it('downloads the image when the provider returns a URL', async () => {
      const service = await build();
      fetchMock
        .mockResolvedValueOnce(
          jsonResponse({ data: [{ url: 'https://cdn.example/img.png' }] }),
        )
        .mockResolvedValueOnce(
          new Response(Buffer.from('downloaded'), { status: 200 }),
        );

      const result = await service.generateImage('m', 'p');

      // Callers upload a Buffer to R2 and should not care which providers inline.
      expect(result.image.toString()).toBe('downloaded');
      expect(fetchMock).toHaveBeenLastCalledWith('https://cdn.example/img.png');
    });

    it('errors when the URL cannot be downloaded', async () => {
      const service = await build();
      fetchMock
        .mockResolvedValueOnce(
          jsonResponse({ data: [{ url: 'https://cdn.example/gone.png' }] }),
        )
        .mockResolvedValueOnce(new Response('', { status: 404 }));

      await expect(service.generateImage('m', 'p')).rejects.toThrow(
        AiProviderError,
      );
    });

    it('maps 402 on the image endpoint too', async () => {
      const service = await build();
      fetchMock.mockResolvedValue(jsonResponse({}, { status: 402 }));

      await expect(service.generateImage('m', 'p')).rejects.toBeInstanceOf(
        InsufficientCreditsError,
      );
    });

    it('errors when there is no image in the payload', async () => {
      const service = await build();
      fetchMock.mockResolvedValue(jsonResponse({ data: [{}] }));

      await expect(service.generateImage('m', 'p')).rejects.toThrow(
        AiProviderError,
      );
    });
  });
});
