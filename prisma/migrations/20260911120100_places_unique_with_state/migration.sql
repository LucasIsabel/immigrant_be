-- The one step of the city identity that is not purely additive: a place's
-- slug becomes unique per (country, city, state) instead of per (country,
-- city), so Campo Grande in Mato Grosso do Sul and Campo Grande in Alagoas can
-- each hold a `catedral`.
--
-- No row is lost. Every place has `state_key = ''` until an ingestion with a
-- state writes one, so the new key accepts exactly the rows the old one did.
-- The new index is built before the old one goes, so the table is never left
-- without a uniqueness guarantee in between.

-- CreateIndex
CREATE UNIQUE INDEX "places_country_code_city_state_key_slug_key" ON "places"("country_code", "city", "state_key", "slug");

-- DropIndex
DROP INDEX "places_country_code_city_slug_key";
