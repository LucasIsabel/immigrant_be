import { timingSafeEqual } from 'node:crypto';
import { NextFunction, Request, Response } from 'express';
import { env } from '@app/config/env';

function safeEquals(a: string, b: string): boolean {
  const left = Buffer.from(a);
  const right = Buffer.from(b);

  // timingSafeEqual throws on length mismatch, which would itself leak length.
  return left.length === right.length && timingSafeEqual(left, right);
}

function unauthorized(res: Response): void {
  res.setHeader('WWW-Authenticate', 'Basic realm="Bull Board"');
  res.status(401).send('Unauthorized');
}

/**
 * Guards the queue dashboard.
 *
 * Basic auth rather than `RolesGuard` for two reasons: the board is Express
 * middleware mounted outside Nest's guard pipeline, so the guard would never
 * run; and credentials from the environment keep the board reachable during a
 * Postgres or session-store outage — exactly when someone needs to look at the
 * queues. Without credentials configured the board is open in development and
 * closed everywhere else.
 */
export function bullBoardBasicAuth(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const user = env.BULL_BOARD_USER;
  const password = env.BULL_BOARD_PASSWORD;

  if (!user || !password) {
    if (env.NODE_ENV === 'development') {
      next();
      return;
    }

    unauthorized(res);
    return;
  }

  const header = req.headers.authorization ?? '';
  if (!header.startsWith('Basic ')) {
    unauthorized(res);
    return;
  }

  const decoded = Buffer.from(header.slice('Basic '.length), 'base64').toString(
    'utf8',
  );
  const separator = decoded.indexOf(':');
  if (separator === -1) {
    unauthorized(res);
    return;
  }

  const providedUser = decoded.slice(0, separator);
  const providedPassword = decoded.slice(separator + 1);

  if (
    !safeEquals(providedUser, user) ||
    !safeEquals(providedPassword, password)
  ) {
    unauthorized(res);
    return;
  }

  next();
}
