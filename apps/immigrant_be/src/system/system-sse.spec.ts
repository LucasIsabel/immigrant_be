jest.mock('@thallesp/nestjs-better-auth', () => {
  const { createParamDecorator } =
    jest.requireActual<typeof import('@nestjs/common')>('@nestjs/common');
  return {
    Session: createParamDecorator(() => ({ user: { id: 'user-1' } })),
    AllowAnonymous: () => () => undefined,
  };
});

jest.mock('@app/database', () => ({
  PrismaService: jest.fn(),
  DatabaseModule: jest.fn(),
}));

import { firstValueFrom, take, toArray } from 'rxjs';
import { SystemController } from './system.controller';
import type { SystemService } from './system.service';
import type { EventsService } from './events.service';
import type { UserSession } from '@thallesp/nestjs-better-auth';

const session = { user: { id: 'user-1' } } as unknown as UserSession;

function build(next: () => Promise<unknown>) {
  const events = {
    getAndConsumeNextEvent: jest.fn(next),
  } as unknown as EventsService;

  return new SystemController({} as SystemService, events);
}

/**
 * The heartbeat, which exists for a reason nothing else in the code can state.
 *
 * A stream with nothing to say sends zero bytes, and an idle connection is one
 * a proxy feels free to drop — Cloudflare does it at 100 seconds. Nothing broke
 * before this: `EventSource` reconnects on its own. It just meant a socket torn
 * down and rebuilt every minute and a half, forever, for nobody.
 *
 * What a unit test can prove is the shape and the cadence. That a real proxy
 * keeps the connection open past 100 seconds is not provable here and has to be
 * checked against the deployed API with `curl -N`.
 */
describe('SSE stream', () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.useRealTimers());

  it('beats every 25 seconds while there is nothing to say', async () => {
    const controller = build(() => Promise.resolve(null));

    const collected = firstValueFrom(
      controller.notification(session).pipe(take(2), toArray()),
    );
    await jest.advanceTimersByTimeAsync(51_000);

    expect(await collected).toEqual([
      { data: '', type: 'heartbeat' },
      { data: '', type: 'heartbeat' },
    ]);
  });

  it('names the beat, so `onmessage` in the browser never sees it', async () => {
    // This is the whole reason the frontend needed no change: `EventSource`
    // only fires `onmessage` for events of type `message`. Rename this and
    // every open tab starts receiving empty notifications.
    const controller = build(() => Promise.resolve(null));

    const first = firstValueFrom(controller.notification(session));
    await jest.advanceTimersByTimeAsync(26_000);

    expect((await first).type).toBe('heartbeat');
  });

  it('still delivers notifications, and marks them as messages', async () => {
    const controller = build(() =>
      Promise.resolve({ id: 'evt-1', type: 'business_page_approved' }),
    );

    const first = firstValueFrom(controller.notification(session));
    await jest.advanceTimersByTimeAsync(1_100);

    expect(await first).toEqual({
      data: JSON.stringify({ id: 'evt-1', type: 'business_page_approved' }),
      type: 'message',
    });
  });
});
