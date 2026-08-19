-- CreateEnum
CREATE TYPE "BlogPersonaTheme" AS ENUM ('IMMIGRATION', 'TOURISM');

-- CreateTable
CREATE TABLE "blog_personas" (
    "id" UUID NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "theme" "BlogPersonaTheme" NOT NULL,
    "editorial_stance" TEXT NOT NULL,
    "persona_prompt" TEXT NOT NULL,
    "style_guidelines" TEXT NOT NULL,
    "preferred_model" TEXT,
    "blog_author_id" UUID NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "blog_personas_pkey" PRIMARY KEY ("id")
);

-- AlterTable
ALTER TABLE "blog_posts" ADD COLUMN "persona_id" UUID,
ADD COLUMN "debate_group_id" UUID,
ADD COLUMN "moderation_flag" JSONB;

-- AlterTable
ALTER TABLE "ai_blog_cron_jobs" ADD COLUMN "persona_id" UUID,
ADD COLUMN "generate_both_sides" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX "blog_personas_slug_key" ON "blog_personas"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "blog_personas_blog_author_id_key" ON "blog_personas"("blog_author_id");

-- CreateIndex
CREATE INDEX "blog_posts_persona_id_idx" ON "blog_posts"("persona_id");

-- CreateIndex
CREATE INDEX "blog_posts_debate_group_id_idx" ON "blog_posts"("debate_group_id");

-- AddForeignKey
ALTER TABLE "blog_personas" ADD CONSTRAINT "blog_personas_blog_author_id_fkey" FOREIGN KEY ("blog_author_id") REFERENCES "blog_authors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "blog_posts" ADD CONSTRAINT "blog_posts_persona_id_fkey" FOREIGN KEY ("persona_id") REFERENCES "blog_personas"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ai_blog_cron_jobs" ADD CONSTRAINT "ai_blog_cron_jobs_persona_id_fkey" FOREIGN KEY ("persona_id") REFERENCES "blog_personas"("id") ON DELETE SET NULL ON UPDATE CASCADE;
