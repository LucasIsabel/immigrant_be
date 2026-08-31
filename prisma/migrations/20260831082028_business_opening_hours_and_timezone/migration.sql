-- AlterTable
ALTER TABLE "businesses" ADD COLUMN     "opening_hours" JSONB,
ADD COLUMN     "timezone" VARCHAR(64);
