-- Repoints the four API-app scenarios at the chain measured in production on
-- 2026-08-27 with a quiz-sized prompt: `google/gemini-3.1-flash-lite` 1.3 s,
-- `deepseek/deepseek-v4-flash` 50 s, `minimax/minimax-m3:free` 3.3 s.
--
-- Two models leave the chain:
--   * `gemini-direct:gemini-2.5-flash-lite` 429s while the Google AI Studio
--     prepay credit is exhausted — the embeddings endpoint included. It can go
--     back from the admin panel once the credit is restored, with no deploy.
--   * `z-ai/glm-5.2:free` answered 429 at the provider, so as a last resort it
--     was no resort at all. `minimax/minimax-m3:free` takes that seat.
--
-- The same values live in `libs/ai/src/model-config.service.ts` and in
-- `prisma/seeds/ai-model-config.seed.ts`, but neither reaches production: the
-- code default only applies to a scenario with no row, and the seed only
-- creates rows that are absent. Production has these rows, and the row shadows
-- the code default — so this migration is what actually changes the behaviour.
--
-- Scoped to rows that still hold the old seeded default. Once an admin edits a
-- chain from the panel they own it, and this must not undo that choice.
UPDATE "ai_model_configs"
SET
  "primary_model" = 'google/gemini-3.1-flash-lite',
  "fallback_models" = ARRAY['deepseek/deepseek-v4-flash', 'minimax/minimax-m3:free'],
  "updated_at" = now()
WHERE
  "scenario" IN (
    'quiz_suggestions',
    'visa_recommendation',
    'visa_steps_translation',
    'business_moderation'
  )
  AND "primary_model" = 'gemini-direct:gemini-2.5-flash-lite'
  AND "fallback_models" = ARRAY['deepseek/deepseek-v4-flash', 'z-ai/glm-5.2:free'];
