/**
 * Applied to every job that does not override it. Each queue talks to Gemini,
 * to R2 or to an external RSS feed, so a transient 5xx/timeout must be retried
 * instead of discarding the work — BullMQ defaults to a single attempt.
 * The retention caps keep completed/failed jobs available for inspection
 * without letting Redis grow unbounded.
 */
export const DEFAULT_JOB_OPTIONS = {
  attempts: 3,
  backoff: { type: 'exponential' as const, delay: 30_000 },
  removeOnComplete: 50,
  removeOnFail: 100,
};

/**
 * Os idiomas para os quais um post é traduzido.
 *
 * Fica aqui porque a API e o worker precisavam concordar e mantinham duas listas
 * em arquivos diferentes: `['en','es','pt']` de um lado, `['pt','es']` do outro.
 * Concordavam só porque a API filtrava o `original_locale` antes de comparar —
 * uma coincidência que a próxima edição desfaria.
 */
export const TRANSLATION_LOCALES = ['pt', 'es'] as const;
export type TranslationLocale = (typeof TRANSLATION_LOCALES)[number];

export const AI_BLOG_QUEUE = 'ai_blog_queue';
export const GENERATE_AI_BLOG_POST = 'generate_ai_blog_post';

export const AI_BLOG_IMAGE_QUEUE = 'ai_blog_image_queue';
export const GENERATE_AI_BLOG_IMAGE = 'generate_ai_blog_image';
export const REFINE_AI_BLOG_POST = 'refine_ai_blog_post';

export const BLOG_TRANSLATION_QUEUE = 'blog_translation_queue';
export const TRANSLATE_BLOG_POST = 'translate_blog_post';
export const TRANSLATE_ALL_PENDING = 'translate_all_pending';

export const AI_IMAGE_QUEUE = 'ai_image_queue';
export const GENERATE_AI_IMAGE = 'generate_ai_image';

export const PLACE_INGESTION_QUEUE = 'place_ingestion_queue';
/** Gathers the facts for one city, then fans out one text job per place. */
export const INGEST_CITY = 'ingest_city';
export const WRITE_PLACE_TEXTS = 'write_place_texts';
export const WRITE_PLACE_IMAGE = 'write_place_image';

/**
 * Filas que o admin pode inspecionar e controlar.
 *
 * Uma lista só, usada pela API JSON (`/admin/queues`) e pelo Bull Board.
 * Uma constante nova de fila não entra aqui automaticamente — se o dashboard
 * precisa vê-la, ela tem que ser adicionada. Isso evita expor fila interna
 * (ou uma que ainda não tem worker) sem decisão explícita.
 */
export const ADMIN_VISIBLE_QUEUES = [
  AI_BLOG_QUEUE,
  AI_BLOG_IMAGE_QUEUE,
  BLOG_TRANSLATION_QUEUE,
  AI_IMAGE_QUEUE,
  PLACE_INGESTION_QUEUE,
] as const;

export type AdminVisibleQueue = (typeof ADMIN_VISIBLE_QUEUES)[number];
