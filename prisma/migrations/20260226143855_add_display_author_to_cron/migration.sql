-- AlterTable
ALTER TABLE "ai_blog_cron_jobs" ADD COLUMN     "display_author_id" UUID;

-- AddForeignKey
ALTER TABLE "ai_blog_cron_jobs" ADD CONSTRAINT "ai_blog_cron_jobs_display_author_id_fkey" FOREIGN KEY ("display_author_id") REFERENCES "blog_authors"("id") ON DELETE SET NULL ON UPDATE CASCADE;
