-- CreateEnum
CREATE TYPE "FeatureKind" AS ENUM ('CURATED', 'PAID');

-- AlterTable
ALTER TABLE "businesses" ADD COLUMN     "feature_kind" "FeatureKind",
ADD COLUMN     "featured_from" TIMESTAMP(3),
ADD COLUMN     "featured_until" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "community_events" ADD COLUMN     "feature_kind" "FeatureKind",
ADD COLUMN     "featured_from" TIMESTAMP(3),
ADD COLUMN     "featured_until" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "places" ADD COLUMN     "feature_kind" "FeatureKind",
ADD COLUMN     "featured_from" TIMESTAMP(3),
ADD COLUMN     "featured_until" TIMESTAMP(3);
