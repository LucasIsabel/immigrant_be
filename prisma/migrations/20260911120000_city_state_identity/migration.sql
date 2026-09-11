-- A city is identified by (country, city_key, state_key). Every column here is
-- nullable or defaulted, so this migration only adds: the deploy applies it
-- automatically, and nothing already stored changes meaning.

-- AlterTable
ALTER TABLE "businesses" ADD COLUMN     "state_key" VARCHAR(120);

-- AlterTable
ALTER TABLE "places" ADD COLUMN     "state" VARCHAR(120),
ADD COLUMN     "state_key" VARCHAR(120) NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "city_ingestions" ADD COLUMN     "city_wikidata_id" VARCHAR(20),
ADD COLUMN     "state" VARCHAR(120),
ADD COLUMN     "state_key" VARCHAR(120);

-- AlterTable
ALTER TABLE "community_events" ADD COLUMN     "state" VARCHAR(120),
ADD COLUMN     "state_key" VARCHAR(120);

-- AlterTable
ALTER TABLE "itinerary_stops" ADD COLUMN     "state" VARCHAR(120),
ADD COLUMN     "state_key" VARCHAR(120);

-- CreateIndex
CREATE INDEX "businesses_city_key_state_key_is_public_idx" ON "businesses"("city_key", "state_key", "is_public");

-- CreateIndex
CREATE INDEX "itinerary_stops_city_key_state_key_idx" ON "itinerary_stops"("city_key", "state_key");

-- Backfill: the fold `normalizeState` applies, written in SQL because a
-- business that already names its state has to be findable by it the moment
-- the filter exists. It is the same `translate` map as
-- 20260831165717_business_city_key, so SQL and TypeScript agree on every key;
-- `unaccent` is still not installed on this server.
--
-- `~ '\S'` is `state?.trim()` in TypeScript: a state that is only whitespace
-- is no state, and its key stays null rather than becoming an empty one.
UPDATE "businesses"
SET "state_key" = lower(
  regexp_replace(
    btrim(translate("state", 'ÀÁÂÃÄÅÇÈÉÊËÌÍÎÏÑÒÓÔÕÖÙÚÛÜÝàáâãäåçèéêëìíîïñòóôõöùúûüýÿĀāĂăĄąĆćĈĉĊċČčĎďĒēĔĕĖėĘęĚěĜĝĞğĠġĢģĤĥĨĩĪīĬĭĮįİĴĵĶķĹĺĻļĽľŃńŅņŇňŌōŎŏŐőŔŕŖŗŘřŚśŜŝŞşŠšŢţŤťŨũŪūŬŭŮůŰűŲųŴŵŶŷŸŹźŻżŽž', 'AAAAAACEEEEIIIINOOOOOUUUUYaaaaaaceeeeiiiinooooouuuuyyAaAaAaCcCcCcCcDdEeEeEeEeEeGgGgGgGgHhIiIiIiIiIJjKkLlLlLlNnNnNnOoOoOoRrRrRrSsSsSsSsTtTtUuUuUuUuUuUuWwYyYZzZzZz')),
    '\s+', ' ', 'g'
  )
)
WHERE "state" ~ '\S';

-- Backfill: a stop copies its target's state when it is added, so the stops
-- already pointing at a business get the state that business has. Without it a
-- state filter on the public itineraries would hide every stop added before
-- today. Places carry no state yet, so there is nothing to copy from them.
UPDATE "itinerary_stops" AS s
SET "state" = b."state",
    "state_key" = b."state_key"
FROM "businesses" AS b
WHERE s."business_id" = b."id"
  AND b."state_key" IS NOT NULL;
