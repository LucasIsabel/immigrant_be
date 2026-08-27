-- AlterTable
ALTER TABLE "immigration_visa_types" ADD COLUMN     "estimated_cost" TEXT,
ADD COLUMN     "main_requirements" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "processing_time" TEXT;
