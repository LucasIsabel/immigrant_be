import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import type { Request } from 'express';

/** Express lower-cases every incoming header name. */
export const ORIGIN_COUNTRY_HEADER = 'cf-ipcountry';

/**
 * The visitor's country, and nothing else about them.
 *
 * Cloudflare resolves it from the IP address at the edge and hands it over as
 * two letters. Taking those and dropping the address is what keeps this out of
 * "we store your IP" territory: a country code on its own does not single
 * anybody out, and it answers the only question the analytics screen asks.
 *
 * Strict on purpose. Anything that is not two ASCII letters — a missing header
 * in local development, a request that reached the origin without passing
 * through Cloudflare, or a forged value — comes back as `null` and is shown as
 * unknown. A guessed country is worse than an absent one: it is a number
 * somebody will act on.
 *
 * `XX` and `T1` are Cloudflare's own markers for "could not tell" and "Tor
 * exit node". Both are well-formed and neither is a country.
 */
export function parseOriginCountry(
  raw: string | string[] | undefined,
): string | null {
  const value = Array.isArray(raw) ? raw[0] : raw;
  if (typeof value !== 'string') return null;

  const code = value.trim().toUpperCase();
  if (!/^[A-Z]{2}$/.test(code)) return null;
  if (code === 'XX' || code === 'T1') return null;

  return code;
}

export const OriginCountry = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): string | null =>
    parseOriginCountry(
      ctx.switchToHttp().getRequest<Request>().headers[ORIGIN_COUNTRY_HEADER],
    ),
);
