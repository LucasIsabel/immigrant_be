-- AlterTable
ALTER TABLE "tour_guide_reviews" ADD COLUMN     "hidden_at" TIMESTAMP(3),
ADD COLUMN     "hidden_by" UUID,
ADD COLUMN     "hidden_reason" VARCHAR(500),
ALTER COLUMN "author_name" DROP NOT NULL;

-- CreateTable
CREATE TABLE "tour_guide_review_reports" (
    "id" UUID NOT NULL,
    "review_id" UUID NOT NULL,
    "reason" VARCHAR(500) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tour_guide_review_reports_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "tour_guide_review_reports_review_id_idx" ON "tour_guide_review_reports"("review_id");

-- CreateIndex
CREATE INDEX "tour_guide_reviews_business_id_hidden_at_idx" ON "tour_guide_reviews"("business_id", "hidden_at");

-- AddForeignKey
ALTER TABLE "tour_guide_reviews" ADD CONSTRAINT "tour_guide_reviews_hidden_by_fkey" FOREIGN KEY ("hidden_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tour_guide_review_reports" ADD CONSTRAINT "tour_guide_review_reports_review_id_fkey" FOREIGN KEY ("review_id") REFERENCES "tour_guide_reviews"("id") ON DELETE CASCADE ON UPDATE CASCADE;
