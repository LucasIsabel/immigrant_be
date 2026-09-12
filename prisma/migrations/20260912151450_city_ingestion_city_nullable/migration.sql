-- The city stops being mandatory, because a country sweep does not have one,
-- and `city_key` follows it: the two are one fold of each other and would lie
-- apart. Separate from the additive migration that precedes it, as in #216
-- (20260831165717 + 20260831170144): that one changes nothing for the code
-- already running, and this one is the only step that touches a column which
-- already exists.
--
-- Safe for the old code running during the deploy: it always writes a city,
-- its rows default to `scope = 'CITY'`, and they satisfy the CHECK below.

ALTER TABLE "city_ingestions" ALTER COLUMN "city" DROP NOT NULL,
ALTER COLUMN "city_key" DROP NOT NULL;

-- Prisma emits a list column with a default but no NOT NULL. The precedent in
-- this repo is the other way (20260209020216_multi_role_support wrote
-- `"roles" "UserRole"[] NOT NULL DEFAULT ...`), and an array that can be NULL
-- as well as empty is two ways to say nothing.
ALTER TABLE "city_ingestions" ALTER COLUMN "categories" SET NOT NULL;

-- What the NOT NULL used to guarantee, said precisely: a city ingestion has a
-- city, a country sweep has none, and the fold never disagrees with the name.
-- `create()` is the only writer today, which is exactly why this is written
-- down — the second writer, a year from now, will not read the comment.
ALTER TABLE "city_ingestions" ADD CONSTRAINT "city_ingestions_scope_city_check"
  CHECK ((scope = 'CITY' AND city IS NOT NULL AND city_key IS NOT NULL)
      OR (scope = 'COUNTRY' AND city IS NULL AND city_key IS NULL));
