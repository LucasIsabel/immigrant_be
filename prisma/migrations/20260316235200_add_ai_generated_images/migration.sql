-- CreateTable
CREATE TABLE "ai_generated_images" (
    "id" UUID NOT NULL,
    "prompt" TEXT NOT NULL,
    "folder" TEXT NOT NULL,
    "key" TEXT,
    "url" TEXT,
    "mime_type" TEXT,
    "is_public" BOOLEAN NOT NULL DEFAULT true,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "error_message" TEXT,
    "user_id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ai_generated_images_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ai_generated_images_user_id_idx" ON "ai_generated_images"("user_id");

-- CreateIndex
CREATE INDEX "ai_generated_images_status_idx" ON "ai_generated_images"("status");

-- AddForeignKey
ALTER TABLE "ai_generated_images" ADD CONSTRAINT "ai_generated_images_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
