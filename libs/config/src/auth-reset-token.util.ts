export function extractResetTokenFromBetterAuthUrl(
  url: string,
  providedToken?: string | null,
): string | null {
  if (
    providedToken &&
    providedToken !== 'null' &&
    providedToken !== 'undefined'
  ) {
    return providedToken;
  }

  try {
    const parsed = new URL(url);
    const fromQuery = parsed.searchParams.get('token');
    if (fromQuery && fromQuery !== 'null' && fromQuery !== 'undefined') {
      return fromQuery;
    }

    const segments = parsed.pathname.split('/').filter(Boolean);
    const lastSegment = segments[segments.length - 1];

    if (lastSegment && lastSegment !== 'reset-password') {
      return lastSegment;
    }
  } catch {
    return null;
  }

  return null;
}
