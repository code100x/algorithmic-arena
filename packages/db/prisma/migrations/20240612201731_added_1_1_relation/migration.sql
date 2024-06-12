/*
  Warnings:

  - You are about to drop the column `testcases` on the `Submission` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Submission" DROP COLUMN "testcases";

-- AlterTable
ALTER TABLE "submissions" ADD COLUMN     "submissionId" TEXT;

-- AddForeignKey
ALTER TABLE "submissions" ADD CONSTRAINT "submissions_submissionId_fkey" FOREIGN KEY ("submissionId") REFERENCES "Submission"("id") ON DELETE SET NULL ON UPDATE CASCADE;
