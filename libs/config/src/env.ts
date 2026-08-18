import { envSchema } from './env.schema';

/**
 * Valida o ambiente no import. Qualquer processo — API, worker, seed — quebra
 * aqui se faltar variável obrigatória, que é o comportamento desejado: falhar no
 * boot é mais barato que descobrir em runtime.
 */
export const env = envSchema.parse(process.env);

export { envSchema } from './env.schema';
export type { EnvSchema } from './env.schema';
