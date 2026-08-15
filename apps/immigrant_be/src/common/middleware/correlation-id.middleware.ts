import { randomUUID } from 'node:crypto';
import { NextFunction, Request, Response } from 'express';
import {
  CORRELATION_ID_HEADER,
  runWithCorrelationId,
} from '@app/config/request-context';

/**
 * Opens the correlation context for the request.
 *
 * Registered with `app.use()` before every other middleware so that pino,
 * better-auth, the guards and the exception filter all run inside it. An
 * inbound `x-request-id` is reused — that is what lets a trace start at the
 * frontend — and the ID is always echoed back so the caller can quote it.
 */
export function correlationIdMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const inbound = req.headers[CORRELATION_ID_HEADER];
  const correlationId =
    (Array.isArray(inbound) ? inbound[0] : inbound) || randomUUID();

  req.id = correlationId;
  res.setHeader(CORRELATION_ID_HEADER, correlationId);

  runWithCorrelationId(correlationId, () => next());
}
