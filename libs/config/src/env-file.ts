import { existsSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { parse } from 'dotenv';

/**
 * Carrega o `.env` para dentro de `process.env` antes que alguém leia dali.
 *
 * Por que isto existe: `ConfigModule.forRoot({ envFilePath: '.env' })` só roda o
 * dotenv quando o Nest constrói o módulo — e isso é tarde demais. `env.ts`
 * valida `process.env` no import, e `app.module.ts` decide o Bull Board a partir
 * de `env.NODE_ENV` na avaliação do próprio arquivo; os dois acontecem enquanto
 * o grafo de imports é resolvido, muito antes de o primeiro módulo existir. O
 * resultado é que localmente o `.env` era decorativo: sem exportar as 13
 * variáveis obrigatórias no shell, o boot morria com `DATABASE_URL is required`
 * a um diretório de distância do arquivo que as tinha.
 *
 * O ambiente real sempre ganha do arquivo. É a semântica padrão do dotenv, mas
 * aqui ela está escrita à mão de propósito: em produção quem manda é o que o
 * Coolify injeta no container, e um `.env` esquecido no disco não pode
 * sequestrar a configuração. Na prática o arquivo nem chega lá — o
 * `.dockerignore` exclui `.env` e o estágio final da imagem só copia `dist`,
 * `node_modules`, `generated` e `prisma` — mas a trava não depende disso.
 */
export function findEnvFile(startDir: string = process.cwd()): string | null {
  // Sobe a árvore em vez de olhar só o cwd: todos os scripts do `package.json`
  // rodam da raiz, mas um `npx tsx` disparado de dentro de `apps/` não roda, e
  // falhar por causa do diretório de onde o comando saiu é ruído puro.
  let dir = startDir;

  for (;;) {
    const candidate = join(dir, '.env');
    if (existsSync(candidate)) return candidate;

    const parent = dirname(dir);
    if (parent === dir) return null;
    dir = parent;
  }
}

/**
 * Aplica o arquivo em `process.env` e devolve as chaves que realmente entraram.
 *
 * Recebe o alvo por parâmetro para ser testável sem mexer no ambiente do
 * processo de teste.
 */
export function loadEnvFile(
  file: string | null = findEnvFile(),
  target: NodeJS.ProcessEnv = process.env,
): string[] {
  if (!file) return [];

  const parsed = parse(readFileSync(file));
  const applied: string[] = [];

  for (const [key, value] of Object.entries(parsed)) {
    // `undefined` e não falsy: `FOO=` no ambiente é uma decisão de quem
    // configurou o deploy, e o arquivo não tem por que desfazê-la.
    if (target[key] === undefined) {
      target[key] = value;
      applied.push(key);
    }
  }

  return applied;
}
