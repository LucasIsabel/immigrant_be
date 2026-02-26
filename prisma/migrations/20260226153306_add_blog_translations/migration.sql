-- AlterTable
ALTER TABLE "blog_posts" ADD COLUMN     "original_locale" TEXT NOT NULL DEFAULT 'pt';

-- CreateTable
CREATE TABLE "blog_post_translations" (
    "id" UUID NOT NULL,
    "post_id" UUID NOT NULL,
    "locale" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "excerpt" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "translated_by" TEXT NOT NULL DEFAULT 'AI',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "blog_post_translations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "blog_post_translations_post_id_idx" ON "blog_post_translations"("post_id");

-- CreateIndex
CREATE UNIQUE INDEX "blog_post_translations_post_id_locale_key" ON "blog_post_translations"("post_id", "locale");

-- AddForeignKey
ALTER TABLE "blog_post_translations" ADD CONSTRAINT "blog_post_translations_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "blog_posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
