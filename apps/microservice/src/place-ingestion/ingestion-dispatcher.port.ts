/**
 * How the ingestion pipeline asks for work to happen later.
 *
 * The pipeline does not know BullMQ. It knows that ingesting a city means
 * fetching facts and then writing text for each place found, and that the two
 * halves run apart. Which broker carries them is somebody else's problem.
 *
 * That separation is deliberate: swapping BullMQ for Kafka or RabbitMQ should
 * mean writing another adapter and another entry point, not rewriting the
 * pipeline.
 *
 * What this port does NOT promise is retry. BullMQ hands us three attempts with
 * exponential backoff for free; Kafka has no such thing, and RabbitMQ spells it
 * with dead-letter queues and TTL. So the contract here is about *intent* — a
 * `RetryableIngestionError` says "this failed for a reason that may pass" — and
 * each adapter decides how to honour it. A port that pretended every broker
 * retries would break silently on the day we switched.
 */
export interface IngestionDispatcher {
  /** Queue the fact-gathering half for one city. */
  dispatchCity(ingestionId: string): Promise<void>;

  /**
   * Queue the text-writing half, one unit of work per place.
   *
   * Per place rather than per city so a model returning unparsable JSON costs
   * one retry instead of re-running the whole city, and so the AI usage log
   * attributes cost to a single entity.
   */
  dispatchPlaceTexts(
    jobs: { placeId: string; ingestionId: string }[],
  ): Promise<void>;
}

/** DI token. An interface leaves no runtime value for Nest to inject. */
export const INGESTION_DISPATCHER = Symbol('INGESTION_DISPATCHER');

/**
 * A failure that may pass on its own: an upstream 429, a 504, a model returning
 * something unparsable.
 *
 * Adapters translate this into whatever their broker understands. What the
 * pipeline guarantees is that throwing it is safe — every step is idempotent,
 * so running the job again does not duplicate anything.
 */
export class RetryableIngestionError extends Error {
  constructor(
    message: string,
    readonly cause?: unknown,
  ) {
    // A causa entra na mensagem, não só na propriedade: o logger e o campo
    // `errorMessage` da ingestão mostram `message`, e "Could not resolve area
    // for Lisbon" sem o motivo não diz se foi 429, timeout ou cidade
    // inexistente — que é justamente o que o admin precisa saber.
    super(cause instanceof Error ? `${message}: ${cause.message}` : message);
    this.name = 'RetryableIngestionError';
  }
}

/**
 * A failure that will not pass by trying again: the city does not exist in
 * OpenStreetMap under any name we know.
 *
 * Kept apart from the retryable kind so an adapter does not burn three attempts
 * on something that is already decided, and so the admin sees the real reason
 * instead of "failed after 3 attempts".
 */
export class PermanentIngestionError extends Error {
  constructor(
    message: string,
    readonly step: string,
  ) {
    super(message);
    this.name = 'PermanentIngestionError';
  }
}
