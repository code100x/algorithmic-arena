/*
  Warnings:

  - The values [AC] on the enum `SubmissionResult` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `constraints` to the `Problem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `languageId` to the `Submission` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "SubmissionResult_new" AS ENUM ('ACCEPTED', 'REJECTED', 'PENDING');
ALTER TABLE "Submission" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Submission" ALTER COLUMN "status" TYPE "SubmissionResult_new" USING ("status"::text::"SubmissionResult_new");
ALTER TYPE "SubmissionResult" RENAME TO "SubmissionResult_old";
ALTER TYPE "SubmissionResult_new" RENAME TO "SubmissionResult";
DROP TYPE "SubmissionResult_old";
ALTER TABLE "Submission" ALTER COLUMN "status" SET DEFAULT 'PENDING';
COMMIT;

-- AlterTable
ALTER TABLE "Problem" ADD COLUMN     "constraints" TEXT NOT NULL,
ADD COLUMN     "examples" TEXT[],
ADD COLUMN     "points" INTEGER NOT NULL DEFAULT 100,
ADD COLUMN     "topics" TEXT[];

-- AlterTable
ALTER TABLE "Submission" ADD COLUMN     "languageId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Submission" ADD CONSTRAINT "Submission_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES "Language"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
