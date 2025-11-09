-- CreateTable
CREATE TABLE "FormLink" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "createdByUserId" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3),
    "maxUses" INTEGER NOT NULL DEFAULT 1,
    "usedCount" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FormLink_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Submission" (
    "id" TEXT NOT NULL,
    "formLinkId" TEXT NOT NULL,
    "submittedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "browser" TEXT,
    "location" TEXT,
    "companyLegalName" TEXT NOT NULL,
    "division" TEXT NOT NULL,
    "branchLocation" TEXT NOT NULL,
    "mcDot" TEXT NOT NULL,
    "primaryContact" TEXT NOT NULL,
    "primaryContactEmail" TEXT NOT NULL,
    "primaryContactPhone" TEXT NOT NULL,
    "secondaryContact" TEXT,
    "secondaryContactEmail" TEXT,
    "secondaryContactPhone" TEXT,
    "escalationContact" TEXT,
    "escalationContactEmail" TEXT,
    "escalationContactPhone" TEXT,
    "accountsPayableContact" TEXT,
    "accountsPayableEmail" TEXT,
    "accountsPayablePhone" TEXT,
    "billingAddress" TEXT NOT NULL,
    "invoicingInstructions" TEXT,
    "paymentMethod" TEXT NOT NULL,
    "w9Upload" TEXT,
    "shipmentTypes" TEXT NOT NULL,
    "equipmentTypes" TEXT NOT NULL,
    "shipmentBuild" TEXT NOT NULL,
    "additionalRequirements" TEXT,
    "monthlyShipments" TEXT NOT NULL,
    "exceptionCommunication" TEXT NOT NULL,
    "reviewFrequency" TEXT NOT NULL,
    "sentToZapier" BOOLEAN NOT NULL DEFAULT false,
    "zapierSentAt" TIMESTAMP(3),
    "zapierError" TEXT,

    CONSTRAINT "Submission_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FormLink_token_key" ON "FormLink"("token");

-- CreateIndex
CREATE INDEX "FormLink_token_idx" ON "FormLink"("token");

-- CreateIndex
CREATE INDEX "FormLink_createdByUserId_idx" ON "FormLink"("createdByUserId");

-- CreateIndex
CREATE INDEX "FormLink_isActive_idx" ON "FormLink"("isActive");

-- CreateIndex
CREATE INDEX "Submission_formLinkId_idx" ON "Submission"("formLinkId");

-- CreateIndex
CREATE INDEX "Submission_companyLegalName_idx" ON "Submission"("companyLegalName");

-- CreateIndex
CREATE INDEX "Submission_submittedAt_idx" ON "Submission"("submittedAt");

-- CreateIndex
CREATE INDEX "Submission_sentToZapier_idx" ON "Submission"("sentToZapier");

-- AddForeignKey
ALTER TABLE "Submission" ADD CONSTRAINT "Submission_formLinkId_fkey" FOREIGN KEY ("formLinkId") REFERENCES "FormLink"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
