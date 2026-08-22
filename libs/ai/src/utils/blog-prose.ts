/**
 * Modelos de escrita enchem o texto de travessão (—), um dos sinais mais
 * óbvios de prosa gerada. O prompt já pede para não usar; isto é a rede se o
 * modelo ignorar.
 *
 * Intervalos numéricos (2019-2024) viram hífen ASCII. O resto vira vírgula.
 */
export function stripEmDashes(text: string): string {
  return text
    .replace(/(\d)\s*[–—]\s*(\d)/g, '$1-$2')
    .replace(/\s*[—–]\s*/g, ', ');
}

export function stripEmDashesFromPost<
  T extends { title: string; excerpt: string; content: string },
>(post: T): T {
  return {
    ...post,
    title: stripEmDashes(post.title),
    excerpt: stripEmDashes(post.excerpt),
    content: stripEmDashes(post.content),
  };
}

/**
 * A mesma limpeza para saídas de forma livre — a tradução das etapas de visto
 * devolve JSON aninhado arbitrário, e a recomendação de visto mistura prosa com
 * UUID no mesmo objeto.
 *
 * Só valores string são transformados. Chaves nunca são tocadas: são
 * identificadores de estrutura ("documents", "financial"), não texto que
 * alguém lê.
 */
export function stripEmDashesDeep<T>(value: T): T {
  return deepStrip(value) as T;
}

/**
 * O núcleo anda em `unknown` de propósito: `Array.isArray` sobre um genérico
 * estreita para `any[]` e o retorno vira `any` — que é exatamente o que o
 * lint proíbe. Em `unknown`, cada ramo devolve um tipo concreto e o cast
 * acontece uma vez só, na borda pública.
 */
function deepStrip(value: unknown): unknown {
  if (typeof value === 'string') {
    return stripEmDashes(value);
  }
  if (Array.isArray(value)) {
    return value.map((item: unknown) => deepStrip(item));
  }
  if (value !== null && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value).map(([key, entry]) => [key, deepStrip(entry)]),
    );
  }
  return value;
}
