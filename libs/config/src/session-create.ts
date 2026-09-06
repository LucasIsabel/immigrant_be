import { APIError } from 'better-auth/api';
import { isBanActive } from './ban';

/** Only what this hook reads, so a test needs no Prisma client. */
export interface SessionUserReader {
  users: {
    findUnique(args: {
      where: { id: string };
      select: { banned: true; banExpires: true };
    }): Promise<{ banned: boolean | null; banExpires: Date | null } | null>;
  };
  userRoles: {
    findMany(args: {
      where: { userId: string };
      select: { role: { select: { name: true } } };
    }): Promise<{ role: { name: string } }[]>;
  };
}

/**
 * What happens the moment before a session row is written.
 *
 * Extracted from the `betterAuth` config so it can be tested. Inside the object
 * literal it was a branch nothing could reach, and this is not a branch worth
 * discovering in production: it is the only thing standing between a banned
 * account and a fresh cookie.
 *
 * Two jobs, in this order. First the door: a ban in force refuses the session
 * outright, so none is ever minted and there is no window in which a banned
 * account holds a valid cookie. Then the roles, stamped onto the session the
 * way they always were.
 */
export async function beforeSessionCreate<T extends { userId: string }>(
  session: T,
  db: SessionUserReader,
): Promise<{ data: T & { roles: string } }> {
  const user = await db.users.findUnique({
    where: { id: session.userId },
    select: { banned: true, banExpires: true },
  });

  if (isBanActive(user)) {
    /*
     * Says the account is suspended and not why. The reason is an admin's note
     * about a person, written for other admins, and a sign-in screen is not
     * where it should first be read aloud.
     */
    throw new APIError('FORBIDDEN', {
      message: 'Esta conta está suspensa.',
    });
  }

  const userRoles = await db.userRoles.findMany({
    where: { userId: session.userId },
    select: { role: { select: { name: true } } },
  });

  return {
    data: {
      ...session,
      roles: JSON.stringify(userRoles.map((ur) => ur.role.name)),
    },
  };
}
