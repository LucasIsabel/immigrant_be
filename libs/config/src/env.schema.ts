/**
 * Só o schema — sem efeito colateral no import.
 *
 * O parse mora em `env.ts`. Separar permite que testes e ferramentas leiam a
 * forma do ambiente sem que o simples `import` derrube o processo por faltar
 * variável, que é o que acontece quando a validação roda no topo do módulo.
 */
import zod from 'zod';

export const envSchema = zod.object({
  DATABASE_URL: zod.string().min(1, 'DATABASE_URL is required'),
  PRIVATE_KEY: zod.string().min(1, 'PRIVATE_KEY is required'),
  GEMINI_API_KEY: zod.string().min(1, 'GEMINI_API_KEY is required'),
  /**
   * Chave da OpenRouter, usada pelo `AiRouterService`.
   *
   * Obrigatória, e não opcional com fallback: sem ela toda geração cairia
   * silenciosamente no último elo da cadeia (Gemini direto), que existe para
   * cobrir esgotamento de crédito — não ausência de configuração. O sintoma
   * seria conteúdo saindo com o modelo errado sem ninguém perceber; falhar no
   * boot é mais barato.
   *
   * O nome é `OPEN_ROUTER` mesmo, sem sufixo, como está no ambiente.
   */
  OPEN_ROUTER: zod.string().min(1, 'OPEN_ROUTER is required'),
  NODE_ENV: zod
    .enum(['development', 'production', 'test'])
    .default('development'),
  PORT_IMMIGRANT: zod.coerce.number().min(1, 'PORT_IMMIGRANT is required'),
  PORT_MICROSERVICE: zod.coerce.number().default(6000),
  REDIS_HOST: zod.string().default('localhost'),
  REDIS_PORT: zod.coerce.number().default(6379),
  REDIS_USER: zod.string().optional(),
  REDIS_PASSWORD: zod.string().optional(),
  CORS_ORIGINS: zod.string().default('http://localhost:3001'),

  /**
   * User-Agent das chamadas ao OSM e à Wikimedia.
   *
   * Não é cosmético: a política de uso do OSM exige identificar a aplicação, e
   * User-Agent genérico de biblioteca é motivo declarado de bloqueio. Tem
   * default para o boot não quebrar em quem não setou — o parse roda no import.
   */
  INGESTION_USER_AGENT: zod
    .string()
    .min(1)
    .default('aloravia/1.0 (https://aloravia.com; contato@aloravia.com)'),
  COOKIE_DOMAIN: zod.string().optional(),
  RESEND_API_KEY: zod.string().min(1, 'RESEND_API_KEY is required'),
  FRONTEND_URL: zod.string().default('http://localhost:3001'),
  EMAIL_FROM: zod.string().default('Aloravia <onboarding@resend.dev>'),
  CLOUDFLARE_R2_ACCESS_KEY_ID: zod.string().min(1),
  CLOUDFLARE_R2_SECRET_ACCESS_KEY: zod.string().min(1),
  CLOUDFLARE_R2_ACCOUNT_ID: zod.string().min(1),
  CLOUDFLARE_R2_BUCKET_NAME: zod.string().min(1),
  CLOUDFLARE_R2_PUBLIC_URL: zod.string().url(),
  CLOUDFLARE_ENDPOINT: zod.string().url(),
  REDIS_URL: zod.string().url(),
  /**
   * Observability. All optional or defaulted on purpose: this schema is parsed
   * at import time in every process (API, worker, seeds), so a newly required
   * variable would break local dev, CI and any deploy that has not set it yet.
   * Without a DSN, Sentry stays disabled instead of failing.
   */
  SENTRY_DSN: zod.string().url().optional(),
  SENTRY_TRACES_SAMPLE_RATE: zod.coerce.number().min(0).max(1).default(0),
  LOG_LEVEL: zod
    .enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace'])
    .default('info'),
  BULL_BOARD_USER: zod.string().optional(),
  BULL_BOARD_PASSWORD: zod.string().optional(),
});

export type EnvSchema = zod.infer<typeof envSchema>;
