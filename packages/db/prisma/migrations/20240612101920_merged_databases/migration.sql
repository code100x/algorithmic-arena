/*
  Warnings:

  - You are about to drop the column `fullCode` on the `Submission` table. All the data in the column will be lost.
  - You are about to drop the column `languageId` on the `Submission` table. All the data in the column will be lost.
  - You are about to drop the `TestCase` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Submission" DROP CONSTRAINT "Submission_languageId_fkey";

-- DropForeignKey
ALTER TABLE "TestCase" DROP CONSTRAINT "TestCase_submissionId_fkey";

-- AlterTable
ALTER TABLE "Submission" DROP COLUMN "fullCode",
DROP COLUMN "languageId",
ADD COLUMN     "testcases" TEXT[],
ALTER COLUMN "updatedAt" DROP NOT NULL;

-- DropTable
DROP TABLE "TestCase";

-- DropEnum
DROP TYPE "TestCaseResult";
