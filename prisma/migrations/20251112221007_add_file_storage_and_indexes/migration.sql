-- AlterTable
ALTER TABLE "Submission" ADD COLUMN     "filesSize" INTEGER,
ADD COLUMN     "formDataSize" INTEGER,
ADD COLUMN     "totalSize" INTEGER;

-- CreateIndex
CREATE INDEX "Submission_formId_submittedAt_idx" ON "Submission"("formId", "submittedAt" DESC);

-- CreateIndex
CREATE INDEX "Submission_submitterEmail_submittedAt_idx" ON "Submission"("submitterEmail", "submittedAt");

-- CreateIndex
CREATE INDEX "Submission_companyName_submittedAt_idx" ON "Submission"("companyName", "submittedAt");

-- CreateIndex
CREATE INDEX "Submission_sentToZapier_zapierSentAt_idx" ON "Submission"("sentToZapier", "zapierSentAt");

-- CreateIndex
CREATE INDEX "Submission_ipAddress_idx" ON "Submission"("ipAddress");

-- CreateIndex
CREATE INDEX "Submission_totalSize_idx" ON "Submission"("totalSize");
