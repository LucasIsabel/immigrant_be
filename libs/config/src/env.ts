import zod from 'zod';

export const envSchema = zod.object({
  DATABASE_URL: zod.string().min(1, 'BETTER_AUTH_SECRET is required'),
  PRIVATE_KEY: zod.string().min(1, 'DATABASE_URL is required'),
});

export const env = envSchema.parse(process.env);

export type EnvSchema = zod.infer<typeof envSchema>;
