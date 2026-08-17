import { Logger } from '@nestjs/common';
import { z } from 'zod';
import { cleanJsonResponse, parseJsonResponse } from './json-response.util';

/**
 * These cases used to live in `gemini-base.service.spec.ts`. They moved here with
 * the code: the failure modes belong to the model, not to the vendor, and now
 * every provider parses through this util.
 */
const schema = z.object({ title: z.string(), score: z.number() });

describe('cleanJsonResponse', () => {
  it('strips the markdown fences models wrap JSON in', () => {
    expect(cleanJsonResponse('```json\n{"a":1}\n```')).toBe('{"a":1}');
  });

  it('leaves bare JSON untouched', () => {
    expect(cleanJsonResponse('{"a":1}')).toBe('{"a":1}');
  });
});

describe('parseJsonResponse', () => {
  let errorSpy: jest.SpyInstance;

  beforeEach(() => {
    errorSpy = jest
      .spyOn(Logger.prototype, 'error')
      .mockImplementation(() => undefined);
  });

  afterEach(() => {
    errorSpy.mockRestore();
  });

  it('returns the parsed value for a valid payload', () => {
    expect(
      parseJsonResponse('```json\n{"title":"Portugal","score":9}\n```', schema),
    ).toEqual({ title: 'Portugal', score: 9 });
    expect(errorSpy).not.toHaveBeenCalled();
  });

  it('reports an empty response instead of failing silently', () => {
    expect(parseJsonResponse(undefined, schema)).toBeNull();
    expect(errorSpy).toHaveBeenCalledWith(
      expect.stringContaining('empty response'),
    );
  });

  it('distinguishes malformed JSON and logs the raw payload', () => {
    expect(parseJsonResponse('{not json', schema)).toBeNull();

    const message = errorSpy.mock.calls[0][0] as string;
    expect(message).toContain('not valid JSON');
    expect(message).toContain('{not json');
  });

  it('distinguishes a schema violation and names the offending field', () => {
    expect(
      parseJsonResponse('{"title":"Portugal","score":"nine"}', schema),
    ).toBeNull();

    const message = errorSpy.mock.calls[0][0] as string;
    expect(message).toContain('does not match the expected schema');
    expect(message).toContain('score');
  });

  it('truncates oversized payloads so logs stay readable', () => {
    const huge = `{"title":"${'x'.repeat(2000)}"}`;

    expect(parseJsonResponse(huge, schema)).toBeNull();

    const message = errorSpy.mock.calls[0][0] as string;
    expect(message).toContain('(truncated)');
    expect(message.length).toBeLessThan(1000);
  });

  it('names the source in the log so a failure points at the model', () => {
    // With several models behind one router, "the model returned junk" is not
    // actionable unless the line says which one.
    parseJsonResponse('{not json', schema, 'anthropic/claude-sonnet-5');

    expect(errorSpy.mock.calls[0][0] as string).toContain(
      'anthropic/claude-sonnet-5',
    );
  });
});
