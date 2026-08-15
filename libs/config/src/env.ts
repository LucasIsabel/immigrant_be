import zod from 'zod';

export const envSchema = zod.object({
  DATABASE_URL: zod.string().min(1, 'DATABASE_URL is required'),
  PRIVATE_KEY: zod.string().min(1, 'PRIVATE_KEY is required'),
  GEMINI_API_KEY: zod.string().min(1, 'GEMINI_API_KEY is required'),
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

export const env = envSchema.parse(process.env);

export type EnvSchema = zod.infer<typeof envSchema>;
