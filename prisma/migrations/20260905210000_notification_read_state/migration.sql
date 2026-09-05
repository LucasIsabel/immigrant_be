-- Turn the SSE queue into an inbox.
--
-- `events` already held every notification the product writes; it was just
-- consumed once and forgotten, because nothing recorded whether a person had
-- actually looked. `read_at` is that record, and it is deliberately separate
-- from `status`: `status` is the transport's delivery state (a row goes to
-- `delivered` the moment the SSE endpoint despatches it), while `read_at` is
-- the human one. A notification delivered to a background tab is `delivered`
-- and unread, and both of those are true at the same time.
--
-- The backfill is the part worth explaining. Everything already in this table
-- was a toast that was either shown or lost — nobody has an inbox to have
-- missed it in. Left unread, the first badge every admin sees on the day this
-- ships would be in the hundreds, which would teach them to ignore the bell in
-- the first minute they own one. Rows still `pending` have genuinely not been
-- delivered yet, so those stay unread and arrive normally.
ALTER TABLE "events" ADD COLUMN "read_at" TIMESTAMP(3);

-- The once-a-second poll of the SSE endpoint.
CREATE INDEX "events_user_id_status_idx" ON "events"("user_id", "status");
-- The inbox listing, newest first.
CREATE INDEX "events_user_id_created_at_idx" ON "events"("user_id", "created_at" DESC);
-- The unread badge.
CREATE INDEX "events_user_id_read_at_idx" ON "events"("user_id", "read_at");

UPDATE "events"
   SET "read_at" = "updated_at"
 WHERE "read_at" IS NULL
   AND "status" <> 'pending';
