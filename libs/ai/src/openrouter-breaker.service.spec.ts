import { Test, TestingModule } from '@nestjs/testing';
import {
  AI_BREAKER_REDIS,
  CREDITS_COOLDOWN_MS,
  OpenRouterBreaker,
} from './openrouter-breaker.service';

/**
 * Um Redis de mentira que guarda o valor em memória, para que dois breakers
 * possam compartilhar o mesmo "servidor" — é essa divisão que o teste precisa
 * demonstrar, já que o defeito original era exatamente cada processo ter a sua.
 */
const fakeRedis = () => {
  const store = new Map<string, string>();

  return {
    store,
    get: jest.fn((key: string) => Promise.resolve(store.get(key) ?? null)),
    set: jest.fn((key: string, value: string | number) => {
      store.set(key, String(value));
      return Promise.resolve('OK');
    }),
  };
};

const build = async (redis?: unknown): Promise<OpenRouterBreaker> => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      OpenRouterBreaker,
      ...(redis ? [{ provide: AI_BREAKER_REDIS, useValue: redis }] : []),
    ],
  }).compile();

  return module.get(OpenRouterBreaker);
};

describe('OpenRouterBreaker', () => {
  it('começa sem bloqueio', async () => {
    const breaker = await build(fakeRedis());

    expect(await breaker.isBlocked()).toBe(false);
    expect(await breaker.blockedUntil()).toBeNull();
  });

  it('bloqueia pelo tempo do cooldown depois de um 402', async () => {
    const breaker = await build(fakeRedis());
    const antes = Date.now();

    await breaker.block();

    expect(await breaker.isBlocked()).toBe(true);
    const until = await breaker.blockedUntil();
    expect(until).not.toBeNull();
    expect(until!.getTime()).toBeGreaterThanOrEqual(
      antes + CREDITS_COOLDOWN_MS,
    );
  });

  it('faz um processo ver o bloqueio que o outro publicou', async () => {
    // É este o defeito que a issue descreve: o worker tropeçava no 402 e seguia
    // gerando pela cadeia de fallback, enquanto a API — outro processo, outro
    // heap — continuava respondendo "não bloqueado" no endpoint de status. O
    // admin lia o estado do processo que não estava gerando nada.
    const redis = fakeRedis();
    const worker = await build(redis);
    const api = await build(redis);

    expect(await api.isBlocked()).toBe(false);

    await worker.block();

    expect(await api.isBlocked()).toBe(true);
    expect(await api.blockedUntil()).not.toBeNull();
  });

  it('publica o cooldown com TTL, para não sobrar estado velho', async () => {
    const redis = fakeRedis();
    const breaker = await build(redis);

    await breaker.block();

    expect(redis.set).toHaveBeenCalledWith(
      'ai:openrouter:blocked_until',
      expect.any(Number),
      'PX',
      CREDITS_COOLDOWN_MS,
    );
  });

  it('sem Redis, o cooldown ainda vale dentro do processo', async () => {
    // Degradar para o comportamento anterior é aceitável; perder o cooldown não
    // seria: todo job voltaria a martelar uma conta sem crédito.
    const breaker = await build(undefined);

    await breaker.block();

    expect(await breaker.isBlocked()).toBe(true);
  });

  it('mantém o bloqueio quando a leitura do Redis falha', async () => {
    const redis = fakeRedis();
    redis.get.mockRejectedValue(new Error('connection refused'));
    const breaker = await build(redis);

    await breaker.block();

    // A memória local é piso, não cache: quem já viu o 402 continua honrando.
    expect(await breaker.isBlocked()).toBe(true);
  });

  it('não deixa o Redis fora do ar impedir a geração', async () => {
    // Se publicar levantasse, o 402 viraria erro de infraestrutura no meio da
    // cadeia e derrubaria o job — em vez de apenas degradar para o fallback.
    const redis = fakeRedis();
    redis.set.mockRejectedValue(new Error('connection refused'));
    const breaker = await build(redis);

    await expect(breaker.block()).resolves.toBeUndefined();
    expect(await breaker.isBlocked()).toBe(true);
  });

  it('ignora valor corrompido no Redis em vez de bloquear para sempre', async () => {
    const redis = fakeRedis();
    redis.store.set('ai:openrouter:blocked_until', 'nem-numero');
    const breaker = await build(redis);

    expect(await breaker.isBlocked()).toBe(false);
  });

  it('deixa de bloquear quando o instante publicado já passou', async () => {
    const redis = fakeRedis();
    redis.store.set('ai:openrouter:blocked_until', String(Date.now() - 1_000));
    const breaker = await build(redis);

    expect(await breaker.isBlocked()).toBe(false);
  });
});
