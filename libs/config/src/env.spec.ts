import { envSchema } from './env.schema';

/**
 * Importa `env.schema` e não `env`: o segundo valida `process.env` no import e
 * derrubaria o teste antes de qualquer assertiva. Foi por isso que os dois foram
 * separados.
 */
const REQUIRED: Record<string, string> = {
  DATABASE_URL: 'postgres://user:pass@localhost:5432/db',
  PRIVATE_KEY: 'private-key',
  GEMINI_API_KEY: 'gemini-key',
  PORT_IMMIGRANT: '3000',
  RESEND_API_KEY: 'resend-key',
  CLOUDFLARE_R2_ACCESS_KEY_ID: 'a',
  CLOUDFLARE_R2_SECRET_ACCESS_KEY: 'b',
  CLOUDFLARE_R2_ACCOUNT_ID: 'c',
  CLOUDFLARE_R2_BUCKET_NAME: 'd',
  CLOUDFLARE_R2_PUBLIC_URL: 'https://cdn.example.com',
  CLOUDFLARE_ENDPOINT: 'https://r2.example.com',
  REDIS_URL: 'redis://localhost:6379',
  OPEN_ROUTER: 'sk-or-v1-fake',
};

/** Cópia sem uma das chaves, sem deixar variável de descarte para trás. */
function semA(key: string): Record<string, string> {
  const copy = { ...REQUIRED };
  delete copy[key];
  return copy;
}

describe('envSchema', () => {
  it('aceita um ambiente completo', () => {
    expect(envSchema.safeParse(REQUIRED).success).toBe(true);
  });

  it('quebra sem OPEN_ROUTER', () => {
    // Falhar no boot é deliberado. Se a chave fosse opcional, toda geração
    // cairia calada no último elo da cadeia — o Gemini direto, que existe para
    // cobrir esgotamento de crédito e não ausência de configuração. O sintoma
    // seria conteúdo saindo com o modelo errado sem ninguém perceber.
    const result = envSchema.safeParse(semA('OPEN_ROUTER'));

    expect(result.success).toBe(false);
    expect(
      result.success
        ? []
        : result.error.issues.map((issue) => issue.path.join('.')),
    ).toContain('OPEN_ROUTER');
  });

  it('quebra com OPEN_ROUTER vazia', () => {
    // Variável declarada e vazia é o caso realista de um deploy mal configurado,
    // e é indistinguível de ausente para quem consome.
    const result = envSchema.safeParse({ ...REQUIRED, OPEN_ROUTER: '' });

    expect(result.success).toBe(false);
  });

  it.each(['DATABASE_URL', 'GEMINI_API_KEY', 'PRIVATE_KEY'])(
    'segue exigindo %s',
    (key) => {
      expect(envSchema.safeParse(semA(key)).success).toBe(false);
    },
  );
});
