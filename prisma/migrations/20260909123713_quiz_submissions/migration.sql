-- One row per quiz submission, which `suggestions` cannot be: `createSuggestions`
-- reuses a row whose `parameters` already exist, so that table counts distinct
-- profiles rather than answers given.
--
-- Additive throughout: a new table, and an INSERT that only touches it.

-- CreateTable
CREATE TABLE "quiz_submissions" (
    "id" UUID NOT NULL,
    "suggestion_id" UUID,
    "origin_country" VARCHAR(2),
    "language" TEXT NOT NULL DEFAULT 'en',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "quiz_submissions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "quiz_submissions_created_at_idx" ON "quiz_submissions"("created_at");

-- CreateIndex
CREATE INDEX "quiz_submissions_suggestion_id_idx" ON "quiz_submissions"("suggestion_id");

-- CreateIndex
CREATE INDEX "quiz_submissions_origin_country_idx" ON "quiz_submissions"("origin_country");

-- AddForeignKey
ALTER TABLE "quiz_submissions" ADD CONSTRAINT "quiz_submissions_suggestion_id_fkey" FOREIGN KEY ("suggestion_id") REFERENCES "suggestions"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- Backfill, so the history does not start at zero on the day this deploys.
--
-- One row per existing profile, which is a **lower bound** on submissions —
-- each profile was answered at least once, and a repeated set of answers left
-- no trace to recover. `origin_country` stays NULL because the country was
-- never recorded; the admin screen shows those as "unknown" and says why.
INSERT INTO "quiz_submissions" (id, suggestion_id, origin_country, language, created_at)
SELECT
  gen_random_uuid(),
  s.id,
  NULL,
  COALESCE(
    (SELECT sl.language FROM "suggestion_languages" sl
      WHERE sl.suggestion_id = s.id ORDER BY sl.id LIMIT 1),
    'en'
  ),
  s.created_at
FROM "suggestions" s;
