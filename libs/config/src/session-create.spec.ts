/*
 * `better-auth/api` is ESM and Jest cannot parse it — the same reason
 * `roles.guard.spec.ts` stubs `better-auth/node`. The double is a real class
 * that keeps the status and the message, so the assertions below are still
 * about what the caller would receive and not about a bare `Error`.
 */
jest.mock('better-auth/api', () => ({
  APIError: class APIError extends Error {
    constructor(
      public readonly status: string,
      body: { message: string },
    ) {
      super(body.message);
      this.name = 'APIError';
    }
  },
}));

import { APIError } from 'better-auth/api';
import { beforeSessionCreate, type SessionUserReader } from './session-create';

/**
 * The double, and the two spies by themselves.
 *
 * Handing the spies back rather than reaching into the object afterwards keeps
 * them plain function values — `expect(reader.userRoles.findMany)` is an
 * unbound method reference, which the lint rightly refuses.
 */
function db(
  user: { banned: boolean | null; banExpires: Date | null } | null,
  roles: string[] = ['user'],
) {
  const findUnique = jest.fn().mockResolvedValue(user);
  const findMany = jest
    .fn()
    .mockResolvedValue(roles.map((name) => ({ role: { name } })));

  return {
    reader: {
      users: { findUnique },
      userRoles: { findMany },
    } as unknown as SessionUserReader,
    findUnique,
    findMany,
  };
}

/**
 * The door.
 *
 * Banning already revoked the sessions that existed, but nothing stopped the
 * person signing straight back in — so the ban lasted exactly as long as it
 * took them to click "log in". These tests are that hole, closed.
 */
describe('beforeSessionCreate', () => {
  it('mints a session for an ordinary account, with its roles', async () => {
    const result = await beforeSessionCreate(
      { userId: 'user-1' },
      db({ banned: false, banExpires: null }, ['user', 'admin']).reader,
    );

    expect(result.data.roles).toBe(JSON.stringify(['user', 'admin']));
  });

  it('refuses a banned account, as a forbidden and not a failure', async () => {
    // A 500 here would read to the person as "try again later", and to us as
    // something broken. It is neither: it is a decision.
    const erro = await beforeSessionCreate(
      { userId: 'user-1' },
      db({ banned: true, banExpires: null }).reader,
    ).catch((e: unknown) => e);

    expect(erro).toBeInstanceOf(APIError);
    expect((erro as { status: string }).status).toBe('FORBIDDEN');
  });

  it('does not read the roles of an account it is refusing', async () => {
    // Order matters beyond tidiness: the refusal must not depend on anything
    // the roles lookup returns, or a user with no roles would take a different
    // path out of here than one with them.
    const { reader, findMany } = db({ banned: true, banExpires: null });

    await expect(
      beforeSessionCreate({ userId: 'user-1' }, reader),
    ).rejects.toThrow();

    expect(findMany).not.toHaveBeenCalled();
  });

  it('says the account is suspended, and not why', async () => {
    // The reason is an admin's note about a person, written for other admins.
    const { reader } = db({ banned: true, banExpires: null });

    await expect(
      beforeSessionCreate({ userId: 'user-1' }, reader),
    ).rejects.toThrow('Esta conta está suspensa.');
  });

  it('lets somebody back in once their ban has expired', async () => {
    // `banned` is still true here — nothing sweeps the column. A temporary ban
    // that never ends is the bug this half of the change exists to avoid.
    const result = await beforeSessionCreate(
      { userId: 'user-1' },
      db({ banned: true, banExpires: new Date(Date.now() - 60_000) }).reader,
    );

    expect(result.data.roles).toBe(JSON.stringify(['user']));
  });

  it('keeps refusing while the ban still has time to run', async () => {
    await expect(
      beforeSessionCreate(
        { userId: 'user-1' },
        db({ banned: true, banExpires: new Date(Date.now() + 60_000) }).reader,
      ),
    ).rejects.toBeInstanceOf(APIError);
  });
});
