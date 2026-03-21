-- CreateTable
CREATE TABLE "user_professional_profiles" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "job_title" TEXT,
    "company" TEXT,
    "linkedin_url" TEXT,
    "github_url" TEXT,
    "website_url" TEXT,
    "bio" TEXT,
    "skills" TEXT[],
    "years_of_experience" INTEGER,
    "location" TEXT,
    "is_public" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_professional_profiles_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_professional_profiles_user_id_key" ON "user_professional_profiles"("user_id");

-- AddForeignKey
ALTER TABLE "user_professional_profiles" ADD CONSTRAINT "user_professional_profiles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
