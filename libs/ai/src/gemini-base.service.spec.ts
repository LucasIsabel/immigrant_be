import { ConfigService } from '@nestjs/config';
import { z } from 'zod';

const mockGetGenerativeModel = jest.fn();

jest.mock('@google/generative-ai', () => ({
  GoogleGenerativeAI: jest.fn().mockImplementation(() => ({
    getGenerativeModel: (...args: unknown[]): unknown =>
      mockGetGenerativeModel(...args),
  })),
  TaskType: { RETRIEVAL_DOCUMENT: 'RETRIEVAL_DOCUMENT' },
}));

import { GeminiBaseService } from './gemini-base.service';

const schema = z.object({ title: z.string(), score: z.number() });

function buildService(): GeminiBaseService {
  const configService = {
    get: jest.fn().mockReturnValue('fake-api-key'),
  } as unknown as ConfigService;
  return new GeminiBaseService(configService);
}

describe('GeminiBaseService', () => {
  let service: GeminiBaseService;
  let errorSpy: jest.SpyInstance;

  beforeEach(() => {
    jest.clearAllMocks();
    mockGetGenerativeModel.mockReturnValue({});
    service = buildService();
    errorSpy = jest
      .spyOn(service['logger'], 'error')
      .mockImplementation(() => undefined);
  });

  describe('constructor', () => {
    it('fails fast when the API key is missing', () => {
      const configService = {
        get: jest.fn().mockReturnValue(undefined),
      } as unknown as ConfigService;

      expect(() => new GeminiBaseService(configService)).toThrow(
        'GEMINI_API_KEY is not configured',
      );
    });
  });

  describe('cleanJsonResponse', () => {
    it('strips the markdown fences Gemini wraps JSON in', () => {
      expect(service.cleanJsonResponse('```json\n{"a":1}\n```')).toBe(
        '{"a":1}',
      );
    });

    it('leaves bare JSON untouched', () => {
      expect(service.cleanJsonResponse('{"a":1}')).toBe('{"a":1}');
    });
  });

  describe('parseJsonResponse', () => {
    it('returns the parsed value for a valid payload', () => {
      const result = service.parseJsonResponse(
        '```json\n{"title":"Portugal","score":9}\n```',
        schema,
      );

      expect(result).toEqual({ title: 'Portugal', score: 9 });
      expect(errorSpy).not.toHaveBeenCalled();
    });

    it('reports an empty response instead of failing silently', () => {
      expect(service.parseJsonResponse(undefined, schema)).toBeNull();
      expect(errorSpy).toHaveBeenCalledWith(
        expect.stringContaining('empty response'),
      );
    });

    it('distinguishes malformed JSON and logs the raw payload', () => {
      expect(service.parseJsonResponse('{not json', schema)).toBeNull();

      const message = errorSpy.mock.calls[0][0] as string;
      expect(message).toContain('not valid JSON');
      expect(message).toContain('{not json');
    });

    it('distinguishes a schema violation and names the offending field', () => {
      expect(
        service.parseJsonResponse(
          '{"title":"Portugal","score":"nine"}',
          schema,
        ),
      ).toBeNull();

      const message = errorSpy.mock.calls[0][0] as string;
      expect(message).toContain('does not match the expected schema');
      expect(message).toContain('score');
    });

    it('truncates oversized payloads so logs stay readable', () => {
      const huge = `{"title":"${'x'.repeat(2000)}"}`;

      expect(service.parseJsonResponse(huge, schema)).toBeNull();

      const message = errorSpy.mock.calls[0][0] as string;
      expect(message).toContain('(truncated)');
      expect(message.length).toBeLessThan(1000);
    });
  });

  describe('normalizeEmbedding', () => {
    it('scales the vector to unit length', () => {
      const normalized = service.normalizeEmbedding([3, 4]);

      expect(normalized).toEqual([0.6, 0.8]);
      const magnitude = Math.hypot(...normalized);
      expect(magnitude).toBeCloseTo(1);
    });
  });
});
