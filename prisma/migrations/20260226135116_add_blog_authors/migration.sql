-- AlterTable
ALTER TABLE "blog_posts" ADD COLUMN     "display_author_id" UUID;

-- CreateTable
CREATE TABLE "blog_authors" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "bio" TEXT,
    "avatar_url" TEXT,
    "website" TEXT,
    "twitter" TEXT,
    "linkedin" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "blog_authors_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "blog_posts_display_author_id_idx" ON "blog_posts"("display_author_id");

-- AddForeignKey
ALTER TABLE "blog_posts" ADD CONSTRAINT "blog_posts_display_author_id_fkey" FOREIGN KEY ("display_author_id") REFERENCES "blog_authors"("id") ON DELETE SET NULL ON UPDATE CASCADE;
