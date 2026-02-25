-- AlterTable
ALTER TABLE "blog_posts" ADD COLUMN     "is_ai_generated" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "ai_blog_cron_jobs" (
    "id" UUID NOT NULL,
    "country_id" UUID NOT NULL,
    "category_id" UUID NOT NULL,
    "cron_expr" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "last_run_at" TIMESTAMP(3),
    "bullmq_job_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ai_blog_cron_jobs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ai_blog_cron_jobs_country_id_idx" ON "ai_blog_cron_jobs"("country_id");

-- AddForeignKey
ALTER TABLE "ai_blog_cron_jobs" ADD CONSTRAINT "ai_blog_cron_jobs_country_id_fkey" FOREIGN KEY ("country_id") REFERENCES "countries"("id") ON DELETE CASCADE ON UPDATE CASCADE;
