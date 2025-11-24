import zod from 'zod';

export const envSchema = zod.object({
  DATABASE_URL: zod.string().min(1, 'DATABASE_URL is required'),
  PRIVATE_KEY: zod.string().min(1, 'PRIVATE_KEY is required'),
  GEMINI_API_KEY: zod.string().min(1, 'GEMINI_API_KEY is required'),
  PORT_IMMIGRANT: zod.coerce.number().min(1, 'PORT_IMMIGRANT is required'),
  PORT_WEBHOOKS: zod.coerce.number().min(1, 'PORT_WEBHOOKS is required'),
  REDIS_URL: zod.string().url('REDIS_URL must be a valid URL').optional(),
});

export const env = envSchema.parse(process.env);

export type EnvSchema = zod.infer<typeof envSchema>;
