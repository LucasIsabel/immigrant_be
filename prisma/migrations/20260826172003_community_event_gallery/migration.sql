-- AlterTable
ALTER TABLE "community_events" ADD COLUMN     "images" TEXT[] DEFAULT ARRAY[]::TEXT[];
