-- CreateEnum
CREATE TYPE "NotificationStatus" AS ENUM ('pending', 'delivered', 'failed');

-- CreateTable
CREATE TABLE "Events" (
    "id" TEXT NOT NULL,
    "user_id" UUID NOT NULL,
    "type" TEXT NOT NULL,
    "title" TEXT,
    "message" TEXT,
    "payload" JSONB,
    "status" "NotificationStatus" NOT NULL DEFAULT 'pending',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Events_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Events_user_id_idx" ON "Events"("user_id");

-- CreateIndex
CREATE INDEX "Events_status_idx" ON "Events"("status");

-- CreateIndex
CREATE INDEX "Events_created_at_idx" ON "Events"("created_at");

-- AddForeignKey
ALTER TABLE "Events" ADD CONSTRAINT "Events_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
