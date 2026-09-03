-- CreateTable
CREATE TABLE "event_favourites" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "event_id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "event_favourites_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "event_favourites_user_id_created_at_idx" ON "event_favourites"("user_id", "created_at");

-- CreateIndex
CREATE UNIQUE INDEX "event_favourites_user_id_event_id_key" ON "event_favourites"("user_id", "event_id");

-- AddForeignKey
ALTER TABLE "event_favourites" ADD CONSTRAINT "event_favourites_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event_favourites" ADD CONSTRAINT "event_favourites_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "community_events"("id") ON DELETE CASCADE ON UPDATE CASCADE;
