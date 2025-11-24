-- AlterTable
ALTER TABLE "plans" ALTER COLUMN "steps" SET DEFAULT '[]';

-- CreateTable
CREATE TABLE "suggestion_languages" (
    "id" UUID NOT NULL,
    "language" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "suggestion_id" UUID NOT NULL,

    CONSTRAINT "suggestion_languages_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "suggestion_languages_suggestion_id_language_key" ON "suggestion_languages"("suggestion_id", "language");

-- AddForeignKey
ALTER TABLE "suggestion_languages" ADD CONSTRAINT "suggestion_languages_suggestion_id_fkey" FOREIGN KEY ("suggestion_id") REFERENCES "suggestions"("id") ON DELETE CASCADE ON UPDATE CASCADE;
