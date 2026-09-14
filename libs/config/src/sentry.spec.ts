jest.mock('./env', () => ({
  env: {
    SENTRY_DSN: 'https://key@sentry.io/123',
    NODE_ENV: 'test',
    SENTRY_TRACES_SAMPLE_RATE: 0.5,
  },
}));

jest.mock('@sentry/nestjs', () => ({
  init: jest.fn(),
}));

import * as Sentry from '@sentry/nestjs';
import { initSentry } from './sentry';

describe('initSentry', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('initialises Sentry for immigrant_be keeping default integrations', () => {
    initSentry('immigrant_be');

    expect(Sentry.init).toHaveBeenCalledTimes(1);
    const options = (Sentry.init as jest.Mock).mock.calls[0][0];

    expect(options.dsn).toBe('https://key@sentry.io/123');
    expect(options.enabled).toBe(true);
    expect(options.environment).toBe('test');
    expect(options.tracesSampleRate).toBe(0.5);
    expect(options.initialScope).toEqual({ tags: { app: 'immigrant_be' } });

    const mockIntegrations = [
      { name: 'Nest' },
      { name: 'Http' },
      { name: 'Console' },
    ];
    const resultingIntegrations = options.integrations(mockIntegrations);
    expect(resultingIntegrations).toEqual(mockIntegrations);
  });

  it('initialises Sentry for microservice filtering out Nest integration', () => {
    initSentry('microservice');

    expect(Sentry.init).toHaveBeenCalledTimes(1);
    const options = (Sentry.init as jest.Mock).mock.calls[0][0];

    expect(options.initialScope).toEqual({ tags: { app: 'microservice' } });

    const mockIntegrations = [
      { name: 'Nest' },
      { name: 'Http' },
      { name: 'Console' },
    ];
    const resultingIntegrations = options.integrations(mockIntegrations);
    expect(resultingIntegrations).toEqual([
      { name: 'Http' },
      { name: 'Console' },
    ]);
  });
});
