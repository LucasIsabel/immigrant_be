-- AlterTable
ALTER TABLE "immigration_visa_types" ADD COLUMN     "steps" JSONB NOT NULL DEFAULT '[]';
