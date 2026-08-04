-- Localize country copy: move the user-facing text fields off `countries`
-- and into one row per language.
--
-- ORDER MATTERS. The backfill (step 4) must run before the DROP (step 7).
-- Reversing them destroys the copy of all countries irreversibly.

-- 1. Safety net: a country with no translation row would lose its text in the
--    backfill, because the UPDATE below joins from the translation side.
--    There are none today, but the migration must not depend on that.
INSERT INTO "country_descriptions" ("id", "country_id", "language", "description")
SELECT gen_random_uuid(), c."id", 'en', ''
FROM "countries" c
WHERE NOT EXISTS (
    SELECT 1 FROM "country_descriptions" d WHERE d."country_id" = c."id"
);

-- 2. Rename the table and everything named after it.
ALTER TABLE "country_descriptions" RENAME TO "country_translations";

ALTER TABLE "country_translations"
    RENAME CONSTRAINT "country_descriptions_pkey" TO "country_translations_pkey";

ALTER TABLE "country_translations"
    RENAME CONSTRAINT "country_descriptions_country_id_fkey" TO "country_translations_country_id_fkey";

ALTER INDEX "country_descriptions_country_id_language_key"
    RENAME TO "country_translations_country_id_language_key";

-- 3. Add the localized columns, nullable for now so the backfill can populate them.
ALTER TABLE "country_translations"
    ADD COLUMN "benefits" TEXT[],
    ADD COLUMN "challenges" TEXT[],
    ADD COLUMN "processing_time" TEXT,
    ADD COLUMN "investment_required" TEXT,
    ADD COLUMN "language_requirement" TEXT;

-- 4. Backfill every language row from the single value currently on `countries`.
--    Rows for `pt` and `es` receive the English text until translated copy is
--    written in the seed. That matches what users already see today.
UPDATE "country_translations" t
SET "benefits" = COALESCE(c."benefits", ARRAY[]::TEXT[]),
    "challenges" = COALESCE(c."challenges", ARRAY[]::TEXT[]),
    "processing_time" = COALESCE(c."processing_time", ''),
    "investment_required" = COALESCE(c."investment_required", ''),
    "language_requirement" = COALESCE(c."language_requirement", '')
FROM "countries" c
WHERE c."id" = t."country_id";

-- 5. Now that every row is populated, enforce the constraints.
ALTER TABLE "country_translations"
    ALTER COLUMN "processing_time" SET NOT NULL,
    ALTER COLUMN "investment_required" SET NOT NULL,
    ALTER COLUMN "language_requirement" SET NOT NULL;

-- 6. Deleting a country should take its translations with it.
--    The old constraint was ON DELETE RESTRICT.
ALTER TABLE "country_translations"
    DROP CONSTRAINT "country_translations_country_id_fkey";

ALTER TABLE "country_translations"
    ADD CONSTRAINT "country_translations_country_id_fkey"
    FOREIGN KEY ("country_id") REFERENCES "countries"("id")
    ON DELETE CASCADE ON UPDATE CASCADE;

-- 7. Only now remove the un-localized columns.
ALTER TABLE "countries"
    DROP COLUMN "benefits",
    DROP COLUMN "challenges",
    DROP COLUMN "processing_time",
    DROP COLUMN "investment_required",
    DROP COLUMN "language_requirement";
