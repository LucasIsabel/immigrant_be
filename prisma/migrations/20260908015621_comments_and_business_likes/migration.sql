-- CreateEnum
CREATE TYPE "CommentStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateTable
CREATE TABLE "comments" (
    "id" UUID NOT NULL,
    "author_id" UUID NOT NULL,
    "post_id" UUID,
    "business_id" UUID,
    "event_id" UUID,
    "itinerary_id" UUID,
    "parent_id" UUID,
    "body" VARCHAR(2000) NOT NULL,
    "image_url" TEXT,
    "status" "CommentStatus" NOT NULL DEFAULT 'PENDING',
    "moderated_at" TIMESTAMP(3),
    "moderated_by" UUID,
    "moderation_reason" VARCHAR(500),
    "deleted_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "comments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "business_likes" (
    "id" UUID NOT NULL,
    "business_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "business_likes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "comments_post_id_status_created_at_idx" ON "comments"("post_id", "status", "created_at");

-- CreateIndex
CREATE INDEX "comments_business_id_status_created_at_idx" ON "comments"("business_id", "status", "created_at");

-- CreateIndex
CREATE INDEX "comments_event_id_status_created_at_idx" ON "comments"("event_id", "status", "created_at");

-- CreateIndex
CREATE INDEX "comments_itinerary_id_status_created_at_idx" ON "comments"("itinerary_id", "status", "created_at");

-- CreateIndex
CREATE INDEX "comments_parent_id_idx" ON "comments"("parent_id");

-- CreateIndex
CREATE INDEX "comments_author_id_idx" ON "comments"("author_id");

-- CreateIndex
CREATE INDEX "business_likes_business_id_idx" ON "business_likes"("business_id");

-- CreateIndex
CREATE INDEX "business_likes_user_id_idx" ON "business_likes"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "business_likes_business_id_user_id_key" ON "business_likes"("business_id", "user_id");

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "blog_posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_business_id_fkey" FOREIGN KEY ("business_id") REFERENCES "businesses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "community_events"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_itinerary_id_fkey" FOREIGN KEY ("itinerary_id") REFERENCES "itineraries"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "comments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_moderated_by_fkey" FOREIGN KEY ("moderated_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "business_likes" ADD CONSTRAINT "business_likes_business_id_fkey" FOREIGN KEY ("business_id") REFERENCES "businesses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "business_likes" ADD CONSTRAINT "business_likes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Exactly one target per comment. Prisma cannot express this, so it is written
-- by hand, in the mould of `itinerary_stops_exactly_one_target`.
ALTER TABLE "comments" ADD CONSTRAINT "comments_exactly_one_target"
  CHECK (num_nonnulls("post_id", "business_id", "event_id", "itinerary_id") = 1);

-- One level of replies only. A CHECK cannot read another row, so the rule lives
-- in a trigger: a reply may only hang off a top-level comment. The service
-- answers 400 before it gets here; this is the net under writes that skip it.
CREATE FUNCTION comments_reject_nested_reply() RETURNS trigger AS $$
BEGIN
  IF NEW.parent_id IS NOT NULL AND EXISTS (
    SELECT 1 FROM "comments" WHERE id = NEW.parent_id AND parent_id IS NOT NULL
  ) THEN
    RAISE EXCEPTION 'a reply cannot have a reply as parent';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER comments_one_level_only
  BEFORE INSERT OR UPDATE OF parent_id ON "comments"
  FOR EACH ROW EXECUTE FUNCTION comments_reject_nested_reply();
