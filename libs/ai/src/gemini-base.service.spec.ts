import { Logger } from '@nestjs/common';
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

  beforeEach(() => {
    jest.clearAllMocks();
    mockGetGenerativeModel.mockReturnValue({});
    service = buildService();
    // The parse failures below are expected; silence them so the suite output
    // stays readable. The messages themselves are asserted in the util's spec.
    jest.spyOn(Logger.prototype, 'error').mockImplementation(() => undefined);
  });

  afterEach(() => {
    jest.restoreAllMocks();
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

  /**
   * The parsing itself moved to `utils/json-response.util.ts` and is covered
   * there. What matters here is that the delegation kept the contract the callers
   * in `system` and `business-pages` depend on: parsed value or `null`, never a
   * throw.
   */
  describe('parseJsonResponse (delegates to the shared util)', () => {
    it('returns the parsed value for a valid payload', () => {
      expect(
        service.parseJsonResponse(
          '```json\n{"title":"Portugal","score":9}\n```',
          schema,
        ),
      ).toEqual({ title: 'Portugal', score: 9 });
    });

    it('returns null instead of throwing on a bad payload', () => {
      expect(service.parseJsonResponse('{not json', schema)).toBeNull();
      expect(service.parseJsonResponse(undefined, schema)).toBeNull();
      expect(
        service.parseJsonResponse(
          '{"title":"Portugal","score":"nine"}',
          schema,
        ),
      ).toBeNull();
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
