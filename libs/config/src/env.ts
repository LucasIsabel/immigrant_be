import { loadEnvFile } from './env-file';
import { envSchema } from './env.schema';

/**
 * O `.env` entra aqui, e não no `ConfigModule`.
 *
 * A validação abaixo roda no import, então precisa do arquivo já aplicado antes
 * dela — `ConfigModule.forRoot({ envFilePath })` acontece na construção do
 * módulo, tarde demais. `loadEnvFile` nunca sobrescreve variável que já veio do
 * ambiente, então em produção o container continua sendo a fonte de verdade;
 * localmente o arquivo preenche o resto.
 */
loadEnvFile();

/**
 * Valida o ambiente no import. Qualquer processo — API, worker, seed — quebra
 * aqui se faltar variável obrigatória, que é o comportamento desejado: falhar no
 * boot é mais barato que descobrir em runtime.
 */
export const env = envSchema.parse(process.env);

export { findEnvFile, loadEnvFile } from './env-file';
export { envSchema } from './env.schema';
export type { EnvSchema } from './env.schema';
