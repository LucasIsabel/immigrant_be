import { createStandaloneRedisClient } from './redis-client';

describe('createStandaloneRedisClient', () => {
  it('opens nothing until the first command, and fails a command instead of retrying it', () => {
    // Nothing listens on this port: a client that connected eagerly would
    // start failing the moment it was built.
    const client = createStandaloneRedisClient('redis://127.0.0.1:1');

    try {
      expect(client.status).toBe('wait');
      expect(client.options.lazyConnect).toBe(true);
      expect(client.options.maxRetriesPerRequest).toBe(0);
      expect(client.options.connectTimeout).toBe(2_000);
    } finally {
      client.disconnect();
    }
  });

  it('listens for errors, so a failed reconnection cannot crash the process', () => {
    const client = createStandaloneRedisClient('redis://127.0.0.1:1');

    try {
      expect(client.listenerCount('error')).toBe(1);
    } finally {
      client.disconnect();
    }
  });
});
