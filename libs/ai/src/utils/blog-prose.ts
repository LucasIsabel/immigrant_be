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
