import * as Sentry from '@sentry/nestjs';
import { env } from './env';

/**
 * Initialises Sentry for one of the two applications.
 *
 * Must run before anything else is imported, which is why each app has a tiny
 * `instrument.ts` that calls this and is the first import of its `main.ts`.
 *
 * Without `SENTRY_DSN` the SDK is initialised disabled rather than skipped, so
 * `captureException` calls elsewhere stay valid no-ops and no caller needs to
 * guard on configuration being present.
 */
export function initSentry(appName: string): void {
  Sentry.init({
    dsn: env.SENTRY_DSN,
    enabled: Boolean(env.SENTRY_DSN),
    environment: env.NODE_ENV,
    tracesSampleRate: env.SENTRY_TRACES_SAMPLE_RATE,
    initialScope: { tags: { app: appName } },
  });
}
