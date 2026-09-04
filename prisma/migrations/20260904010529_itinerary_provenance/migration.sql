-- Provenance for copies, and the timestamp of the last copy.
--
-- Both columns are nullable with no default, so Postgres does not rewrite the
-- table. The unique index is created over a column that is NULL on every
-- existing row, and NULLs are distinct in a Postgres unique index — so no
-- existing data can make it fail. Additive on purpose: `migrate deploy` runs
-- unattended before the app starts.
ALTER TABLE "itineraries" ADD COLUMN     "copied_at" TIMESTAMP(3),
ADD COLUMN     "source_itinerary_id" UUID;

-- One copy per source per user. The itineraries somebody created all carry
-- NULL here and therefore never collide with one another.
CREATE UNIQUE INDEX "itineraries_user_id_source_itinerary_id_key" ON "itineraries"("user_id", "source_itinerary_id");
