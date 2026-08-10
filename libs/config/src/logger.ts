import { randomUUID } from 'node:crypto';
import type { Params } from 'nestjs-pino';
import { env } from './env';
import { CORRELATION_ID_HEADER, getCorrelationId } from './request-context';

/**
 * Shared pino configuration for both applications.
 *
 * `pino-pretty` is loaded as a transport only in development: the production
 * build is bundled by webpack (`nest-cli.json` sets `"webpack": true`) and the
 * transport resolves its target module by string from a worker thread, which
 * does not survive bundling. In production the JSON goes straight to stdout,
 * which is what the log collector wants anyway.
 */
export function buildPinoOptions(appName: string): Params {
  const isDevelopment = env.NODE_ENV === 'development';

  return {
    pinoHttp: {
      level: env.LOG_LEVEL,
      base: { app: appName },
      /**
       * Pulls the correlation ID out of the async context on every log line, so
       * a service logging deep in a call stack is tied to its request without
       * anyone having to pass the ID around.
       */
      mixin: () => {
        const correlationId = getCorrelationId();
        return correlationId ? { correlationId } : {};
      },
      genReqId: (req, res) => {
        const existing =
          (req.id as string | undefined) ??
          (req.headers[CORRELATION_ID_HEADER] as string | undefined);
        const id = existing ?? randomUUID();
        res.setHeader(CORRELATION_ID_HEADER, id);
        return id;
      },
      redact: {
        paths: [
          'req.headers.authorization',
          'req.headers.cookie',
          'res.headers["set-cookie"]',
        ],
        remove: true,
      },
      /**
       * Health polling is a heartbeat, not an event — logging every one buries
       * the traffic that matters.
       */
      autoLogging: {
        ignore: (req) => (req.url ?? '').includes('/health'),
      },
      transport: isDevelopment
        ? { target: 'pino-pretty', options: { singleLine: true } }
        : undefined,
    },
  };
}
