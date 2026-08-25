/**
 * The port, and only the port.
 *
 * `IngestionModule` is deliberately absent from this barrel. It imports the
 * BullMQ config, which parses `env` at import time — so re-exporting it here
 * would mean that merely importing `INGESTION_DISPATCHER`, the token whose
 * entire purpose is to hide the broker, loads the broker's configuration and
 * every environment variable it needs.
 *
 * That is not only a test annoyance (it broke CI, where `OPEN_ROUTER` is
 * unset): a port that cannot be referenced without dragging in an adapter has
 * given up half of what it exists for.
 *
 * Wiring DI is a different job, and the two modules that do it import
 * `@app/ingestion/ingestion.module` explicitly.
 */
export {
  INGESTION_DISPATCHER,
  PermanentIngestionError,
  RetryableIngestionError,
  type IngestionDispatcher,
} from './ingestion-dispatcher.port';
