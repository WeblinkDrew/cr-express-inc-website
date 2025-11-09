/*
  Warnings:

  - You are about to drop the column `accountsPayableContact` on the `Submission` table. All the data in the column will be lost.
  - You are about to drop the column `billingAddress` on the `Submission` table. All the data in the column will be lost.
  - You are about to drop the column `branchLocation` on the `Submission` table. All the data in the column will be lost.
  - You are about to drop the column `escalationContact` on the `Submission` table. All the data in the column will be lost.
  - You are about to drop the column `mcDot` on the `Submission` table. All the data in the column will be lost.
  - You are about to drop the column `primaryContact` on the `Submission` table. All the data in the column will be lost.
  - You are about to drop the column `secondaryContact` on the `Submission` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "FormType" AS ENUM ('CARRIER_ONBOARDING', 'AXIOM_INVOICING', 'BATHROOM_REQUEST', 'CARGO_DAMAGE_REPORT', 'CARGO_SHORTAGE_OVERAGE_REPORT', 'DRIVER_FEEDBACK', 'EMPLOYEE_ASSET_CHECKIN', 'FORKLIFT_INSPECTION', 'LOAD_CREATION_REQUEST', 'ULD_INSPECTION', 'WAREHOUSE_CHECKIN', 'WAREHOUSE_SERVICES');

-- DropForeignKey
ALTER TABLE "Submission" DROP CONSTRAINT "Submission_formLinkId_fkey";

-- AlterTable
ALTER TABLE "Submission" DROP COLUMN "accountsPayableContact",
DROP COLUMN "billingAddress",
DROP COLUMN "branchLocation",
DROP COLUMN "escalationContact",
DROP COLUMN "mcDot",
DROP COLUMN "primaryContact",
DROP COLUMN "secondaryContact",
ADD COLUMN     "accountsPayableFirstName" TEXT,
ADD COLUMN     "accountsPayableLastName" TEXT,
ADD COLUMN     "billingAddressLine1" TEXT,
ADD COLUMN     "billingCity" TEXT,
ADD COLUMN     "billingState" TEXT,
ADD COLUMN     "billingZipCode" TEXT,
ADD COLUMN     "branchAddressLine1" TEXT,
ADD COLUMN     "branchCity" TEXT,
ADD COLUMN     "branchState" TEXT,
ADD COLUMN     "branchZipCode" TEXT,
ADD COLUMN     "companyName" TEXT,
ADD COLUMN     "dot" TEXT,
ADD COLUMN     "escalationContactFirstName" TEXT,
ADD COLUMN     "escalationContactLastName" TEXT,
ADD COLUMN     "files" JSONB,
ADD COLUMN     "formData" JSONB,
ADD COLUMN     "formId" TEXT,
ADD COLUMN     "mc" TEXT,
ADD COLUMN     "primaryContactFirstName" TEXT,
ADD COLUMN     "primaryContactLastName" TEXT,
ADD COLUMN     "scacCode" TEXT,
ADD COLUMN     "secondaryContactFirstName" TEXT,
ADD COLUMN     "secondaryContactLastName" TEXT,
ADD COLUMN     "submitterEmail" TEXT,
ADD COLUMN     "submitterName" TEXT,
ADD COLUMN     "submitterPhone" TEXT,
ALTER COLUMN "formLinkId" DROP NOT NULL,
ALTER COLUMN "companyLegalName" DROP NOT NULL,
ALTER COLUMN "division" DROP NOT NULL,
ALTER COLUMN "primaryContactEmail" DROP NOT NULL,
ALTER COLUMN "primaryContactPhone" DROP NOT NULL,
ALTER COLUMN "paymentMethod" DROP NOT NULL,
ALTER COLUMN "shipmentTypes" DROP NOT NULL,
ALTER COLUMN "equipmentTypes" DROP NOT NULL,
ALTER COLUMN "shipmentBuild" DROP NOT NULL,
ALTER COLUMN "monthlyShipments" DROP NOT NULL,
ALTER COLUMN "exceptionCommunication" DROP NOT NULL,
ALTER COLUMN "reviewFrequency" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Form" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "formType" "FormType" NOT NULL,
    "description" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Form_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Form_slug_key" ON "Form"("slug");

-- CreateIndex
CREATE INDEX "Form_slug_idx" ON "Form"("slug");

-- CreateIndex
CREATE INDEX "Form_isActive_idx" ON "Form"("isActive");

-- CreateIndex
CREATE INDEX "Form_formType_idx" ON "Form"("formType");

-- CreateIndex
CREATE INDEX "Submission_formId_idx" ON "Submission"("formId");

-- CreateIndex
CREATE INDEX "Submission_submitterEmail_idx" ON "Submission"("submitterEmail");

-- CreateIndex
CREATE INDEX "Submission_submitterName_idx" ON "Submission"("submitterName");

-- CreateIndex
CREATE INDEX "Submission_companyName_idx" ON "Submission"("companyName");

-- AddForeignKey
ALTER TABLE "Submission" ADD CONSTRAINT "Submission_formId_fkey" FOREIGN KEY ("formId") REFERENCES "Form"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Submission" ADD CONSTRAINT "Submission_formLinkId_fkey" FOREIGN KEY ("formLinkId") REFERENCES "FormLink"("id") ON DELETE SET NULL ON UPDATE CASCADE;
