/**
 * Carried by every queue job so the work can be tied back to the request that
 * asked for it. Optional because jobs already sitting in Redis when this
 * shipped predate the field, and because cron ticks have no request behind
 * them — both fall back to the job id.
 */
export interface CorrelatedJobData {
  correlationId?: string;
}
