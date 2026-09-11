-- Places and community events compare their city the way businesses do: by
-- `city_key`, the fold `normalizeCity` applies (`business/city-key.ts`).
-- Additive only — the deploy applies it on its own — and nothing is dropped.

ALTER TABLE "places" ADD COLUMN "city_key" VARCHAR(100);
ALTER TABLE "community_events" ADD COLUMN "city_key" VARCHAR(100);
ALTER TABLE "city_ingestions" ADD COLUMN "city_key" VARCHAR(100);

-- Backfill: the same `translate` map as 20260831165717_business_city_key and
-- 20260911120000_city_state_identity (copied byte for byte), so every table
-- folds the same way. Whatever decomposes outside Latin-1 and Latin Extended-A
-- is reconciled once by `scripts/backfill-city-keys.ts`, which folds in TS.
UPDATE "places" SET "city_key" = lower(regexp_replace(btrim(translate("city", 'ÀÁÂÃÄÅÇÈÉÊËÌÍÎÏÑÒÓÔÕÖÙÚÛÜÝàáâãäåçèéêëìíîïñòóôõöùúûüýÿĀāĂăĄąĆćĈĉĊċČčĎďĒēĔĕĖėĘęĚěĜĝĞğĠġĢģĤĥĨĩĪīĬĭĮįİĴĵĶķĹĺĻļĽľŃńŅņŇňŌōŎŏŐőŔŕŖŗŘřŚśŜŝŞşŠšŢţŤťŨũŪūŬŭŮůŰűŲųŴŵŶŷŸŹźŻżŽž', 'AAAAAACEEEEIIIINOOOOOUUUUYaaaaaaceeeeiiiinooooouuuuyyAaAaAaCcCcCcCcDdEeEeEeEeEeGgGgGgGgHhIiIiIiIiIJjKkLlLlLlNnNnNnOoOoOoRrRrRrSsSsSsSsTtTtUuUuUuUuUuUuWwYyYZzZzZz')), '\s+', ' ', 'g'));
UPDATE "community_events" SET "city_key" = lower(regexp_replace(btrim(translate("city", 'ÀÁÂÃÄÅÇÈÉÊËÌÍÎÏÑÒÓÔÕÖÙÚÛÜÝàáâãäåçèéêëìíîïñòóôõöùúûüýÿĀāĂăĄąĆćĈĉĊċČčĎďĒēĔĕĖėĘęĚěĜĝĞğĠġĢģĤĥĨĩĪīĬĭĮįİĴĵĶķĹĺĻļĽľŃńŅņŇňŌōŎŏŐőŔŕŖŗŘřŚśŜŝŞşŠšŢţŤťŨũŪūŬŭŮůŰűŲųŴŵŶŷŸŹźŻżŽž', 'AAAAAACEEEEIIIINOOOOOUUUUYaaaaaaceeeeiiiinooooouuuuyyAaAaAaCcCcCcCcDdEeEeEeEeEeGgGgGgGgHhIiIiIiIiIJjKkLlLlLlNnNnNnOoOoOoRrRrRrSsSsSsSsTtTtUuUuUuUuUuUuWwYyYZzZzZz')), '\s+', ' ', 'g'));
UPDATE "city_ingestions" SET "city_key" = lower(regexp_replace(btrim(translate("city", 'ÀÁÂÃÄÅÇÈÉÊËÌÍÎÏÑÒÓÔÕÖÙÚÛÜÝàáâãäåçèéêëìíîïñòóôõöùúûüýÿĀāĂăĄąĆćĈĉĊċČčĎďĒēĔĕĖėĘęĚěĜĝĞğĠġĢģĤĥĨĩĪīĬĭĮįİĴĵĶķĹĺĻļĽľŃńŅņŇňŌōŎŏŐőŔŕŖŗŘřŚśŜŝŞşŠšŢţŤťŨũŪūŬŭŮůŰűŲųŴŵŶŷŸŹźŻżŽž', 'AAAAAACEEEEIIIINOOOOOUUUUYaaaaaaceeeeiiiinooooouuuuyyAaAaAaCcCcCcCcDdEeEeEeEeEeGgGgGgGgHhIiIiIiIiIJjKkLlLlLlNnNnNnOoOoOoRrRrRrSsSsSsSsTtTtUuUuUuUuUuUuWwYyYZzZzZz')), '\s+', ' ', 'g'));

ALTER TABLE "places" ALTER COLUMN "city_key" SET NOT NULL;
ALTER TABLE "community_events" ALTER COLUMN "city_key" SET NOT NULL;
ALTER TABLE "city_ingestions" ALTER COLUMN "city_key" SET NOT NULL;

CREATE INDEX "places_country_code_city_key_is_active_idx" ON "places"("country_code", "city_key", "is_active");
CREATE INDEX "community_events_country_code_city_key_status_starts_at_idx" ON "community_events"("country_code", "city_key", "status", "starts_at");
CREATE INDEX "city_ingestions_country_code_city_key_idx" ON "city_ingestions"("country_code", "city_key");
