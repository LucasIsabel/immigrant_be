-- CreateTable
CREATE TABLE "blog_post_likes" (
    "id" UUID NOT NULL,
    "post_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "blog_post_likes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "blog_post_likes_post_id_idx" ON "blog_post_likes"("post_id");

-- CreateIndex
CREATE INDEX "blog_post_likes_user_id_idx" ON "blog_post_likes"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "blog_post_likes_post_id_user_id_key" ON "blog_post_likes"("post_id", "user_id");

-- AddForeignKey
ALTER TABLE "blog_post_likes" ADD CONSTRAINT "blog_post_likes_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "blog_posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "blog_post_likes" ADD CONSTRAINT "blog_post_likes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
