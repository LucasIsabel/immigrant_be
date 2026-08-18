-- CreateEnum
CREATE TYPE "BlogPipelineStatus" AS ENUM ('TRANSLATING', 'GENERATING_IMAGE', 'READY', 'FAILED_TRANSLATION', 'FAILED_IMAGE');

-- AlterTable
ALTER TABLE "blog_posts" ADD COLUMN     "pipeline_error" JSONB,
ADD COLUMN     "pipeline_status" "BlogPipelineStatus" NOT NULL DEFAULT 'READY',
ADD COLUMN     "source_topic" TEXT;

-- CreateIndex
CREATE INDEX "blog_posts_pipeline_status_idx" ON "blog_posts"("pipeline_status");

