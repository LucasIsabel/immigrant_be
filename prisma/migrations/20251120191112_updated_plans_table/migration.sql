-- AlterTable
ALTER TABLE "plans" ADD COLUMN     "selected_visa_type_id" UUID;

-- AddForeignKey
ALTER TABLE "plans" ADD CONSTRAINT "plans_selected_visa_type_id_fkey" FOREIGN KEY ("selected_visa_type_id") REFERENCES "immigration_visa_types"("id") ON DELETE SET NULL ON UPDATE CASCADE;
