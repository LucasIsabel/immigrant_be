-- CreateEnum
CREATE TYPE "BusinessPageStatus" AS ENUM ('DRAFT', 'PENDING_REVIEW', 'APPROVED', 'REJECTED', 'APPROVED_WITH_PENDING');

-- CreateTable
CREATE TABLE "business_pages" (
    "id" UUID NOT NULL,
    "business_id" UUID NOT NULL,
    "slug" VARCHAR(48) NOT NULL,
    "business_type" VARCHAR(50) NOT NULL,
    "approved_content" JSONB,
    "approved_at" TIMESTAMP(3),
    "approved_by" UUID,
    "pending_content" JSONB,
    "submitted_at" TIMESTAMP(3),
    "status" "BusinessPageStatus" NOT NULL DEFAULT 'DRAFT',
    "rejection_reason" TEXT,
    "rejected_at" TIMESTAMP(3),
    "rejected_by" UUID,
    "slug_locked_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "business_pages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "business_page_reviews" (
    "id" UUID NOT NULL,
    "page_id" UUID NOT NULL,
    "reviewer_id" UUID,
    "action" VARCHAR(20) NOT NULL,
    "reason" TEXT,
    "content_snapshot" JSONB,
    "reviewed_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "business_page_reviews_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "publisher_qualifications" (
    "business_id" UUID NOT NULL,
    "is_qualified" BOOLEAN NOT NULL DEFAULT false,
    "qualified_at" TIMESTAMP(3),
    "total_approvals" INTEGER NOT NULL DEFAULT 0,
    "last_rejection_at" TIMESTAMP(3),
    "disqualified_at" TIMESTAMP(3),
    "disqualification_reason" TEXT,

    CONSTRAINT "publisher_qualifications_pkey" PRIMARY KEY ("business_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "business_pages_business_id_key" ON "business_pages"("business_id");

-- CreateIndex
CREATE UNIQUE INDEX "business_pages_slug_key" ON "business_pages"("slug");

-- CreateIndex
CREATE INDEX "business_pages_slug_idx" ON "business_pages"("slug");

-- CreateIndex
CREATE INDEX "business_pages_status_idx" ON "business_pages"("status");

-- CreateIndex
CREATE INDEX "business_pages_business_id_idx" ON "business_pages"("business_id");

-- CreateIndex
CREATE INDEX "business_page_reviews_page_id_idx" ON "business_page_reviews"("page_id");

-- AddForeignKey
ALTER TABLE "business_pages" ADD CONSTRAINT "business_pages_business_id_fkey" FOREIGN KEY ("business_id") REFERENCES "businesses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "business_pages" ADD CONSTRAINT "business_pages_approved_by_fkey" FOREIGN KEY ("approved_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "business_pages" ADD CONSTRAINT "business_pages_rejected_by_fkey" FOREIGN KEY ("rejected_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "business_page_reviews" ADD CONSTRAINT "business_page_reviews_page_id_fkey" FOREIGN KEY ("page_id") REFERENCES "business_pages"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "business_page_reviews" ADD CONSTRAINT "business_page_reviews_reviewer_id_fkey" FOREIGN KEY ("reviewer_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "publisher_qualifications" ADD CONSTRAINT "publisher_qualifications_business_id_fkey" FOREIGN KEY ("business_id") REFERENCES "businesses"("id") ON DELETE CASCADE ON UPDATE CASCADE;
