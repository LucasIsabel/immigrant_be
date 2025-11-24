-- AlterTable
ALTER TABLE "plans" ADD COLUMN     "documents" JSONB NOT NULL DEFAULT '[]',
ADD COLUMN     "progress" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "steps_completed" JSONB NOT NULL DEFAULT '[]',
ADD COLUMN     "steps_remaining" JSONB NOT NULL DEFAULT '[]';
