import { Job } from 'bullmq';

/**
 * The worker-facing notification types now live in `@app/notifications`, next
 * to the ones the API emits, so there is one list to keep honest instead of
 * two. This file stays because `isFinalAttempt` is a BullMQ concern and has no
 * business inside a library the API also loads — and because re-exporting means
 * the five consumers do not change an import to gain nothing.
 *
 * The deep path, not the barrel: the barrel pulls in `NotificationsModule` and
 * with it the whole Nest and better-auth graph, which is a lot of machinery to
 * drag behind a file whose job is to hand out fifteen strings.
 */
export {
  EVENT_TYPES,
  type EventType,
} from '@app/notifications/notification-types';

/**
 * True once BullMQ has exhausted the configured attempts. The `failed` worker
 * event fires on every attempt, so notifying the user without this check would
 * send one error toast per retry.
 */
export function isFinalAttempt(job: Job): boolean {
  return job.attemptsMade >= (job.opts?.attempts ?? 1);
}
