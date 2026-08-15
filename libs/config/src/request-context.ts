import { AsyncLocalStorage } from 'node:async_hooks';

/**
 * Header used to receive and echo the correlation ID. Accepting it on the way
 * in is what lets a request be traced from the frontend through the API and
 * into the queue workers instead of starting over at each hop.
 */
export const CORRELATION_ID_HEADER = 'x-request-id';

interface RequestContext {
  correlationId: string;
}

/**
 * Single source of truth for the correlation ID of the work currently running.
 *
 * `nestjs-pino` keeps its *logger* in an ALS of its own, but exposes no stable
 * way to read the request id from inside a service — which is exactly what the
 * queue producers need in order to stamp the ID onto the job they enqueue. So
 * the ID lives here, and pino (via `mixin`), Sentry (via tag) and the producers
 * all read from the same place.
 */
const storage = new AsyncLocalStorage<RequestContext>();

/**
 * Returns the correlation ID of the current execution, or `undefined` when the
 * caller is outside any context (bootstrap, cron tick, a stray script).
 */
export function getCorrelationId(): string | undefined {
  return storage.getStore()?.correlationId;
}

/**
 * Runs `fn` with `correlationId` attached to the async execution context. Every
 * continuation started inside `fn` inherits it, which is what makes the ID show
 * up in logs emitted deep inside a service without threading it through calls.
 */
export function runWithCorrelationId<T>(correlationId: string, fn: () => T): T {
  return storage.run({ correlationId }, fn);
}
