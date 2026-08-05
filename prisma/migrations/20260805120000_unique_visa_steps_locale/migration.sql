-- Enforce one set of steps per (visa type, language).
--
-- `UserRepository.getVisaStepsByRecommendation` reads with `findFirst` and no
-- `orderBy`, so a duplicate pair makes the row the user receives undefined. The
-- admin UI (`POST /visa-steps`) can create duplicates today.
--
-- Confirmed zero duplicate pairs in production before writing this, so the
-- index builds without a cleanup step. Adding it now, before the bulk seed of
-- the remaining 236 visa types, keeps the risk from scaling with the volume.
CREATE UNIQUE INDEX "visa_steps_visa_type_id_language_key"
    ON "visa_steps"("visa_type_id", "language");
