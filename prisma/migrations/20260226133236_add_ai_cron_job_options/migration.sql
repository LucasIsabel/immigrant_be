-- AlterTable
ALTER TABLE "ai_blog_cron_jobs" ADD COLUMN     "author_id" UUID,
ADD COLUMN     "complexity" TEXT NOT NULL DEFAULT 'SIMPLE',
ADD COLUMN     "custom_instructions" TEXT,
ADD COLUMN     "political_tone" TEXT NOT NULL DEFAULT 'NEUTRAL';
