import { extractResetTokenFromBetterAuthUrl } from './auth-reset-token.util';

describe('extractResetTokenFromBetterAuthUrl', () => {
  it('returns provided token when valid', () => {
    const url =
      'https://api.immigrantmatch.com/api/v1/auth/reset-password/some-token?callbackURL=%2Freset-password';

    const result = extractResetTokenFromBetterAuthUrl(url, 'explicit-token');

    expect(result).toBe('explicit-token');
  });

  it('extracts token from query string when present', () => {
    const url =
      'https://api.immigrantmatch.com/api/v1/auth/reset-password?token=query-token';

    const result = extractResetTokenFromBetterAuthUrl(url, null);

    expect(result).toBe('query-token');
  });

  it('extracts token from path when not in query', () => {
    const url =
      'https://api.immigrantmatch.com/api/v1/auth/reset-password/path-token?callbackURL=%2Freset-password';

    const result = extractResetTokenFromBetterAuthUrl(url, null);

    expect(result).toBe('path-token');
  });

  it('returns null when token cannot be determined', () => {
    const url =
      'https://api.immigrantmatch.com/api/v1/auth/reset-password?callbackURL=%2Freset-password';

    const result = extractResetTokenFromBetterAuthUrl(url, null);

    expect(result).toBeNull();
  });
});
