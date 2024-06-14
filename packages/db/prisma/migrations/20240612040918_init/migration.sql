/*
  Warnings:

  - You are about to drop the column `Title` on the `Solution` table. All the data in the column will be lost.
  - You are about to drop the column `submissionId` on the `Solution` table. All the data in the column will be lost.
  - Added the required column `code` to the `Solution` table without a default value. This is not possible if the table is not empty.
  - Added the required column `languageId` to the `Solution` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Solution` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "VoteType" AS ENUM ('UPVOTE', 'DOWNVOTE');

-- DropForeignKey
ALTER TABLE "Solution" DROP CONSTRAINT "Solution_submissionId_fkey";

-- AlterTable
ALTER TABLE "Solution" DROP COLUMN "Title",
DROP COLUMN "submissionId",
ADD COLUMN     "code" TEXT NOT NULL,
ADD COLUMN     "languageId" INTEGER NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Solution" ADD CONSTRAINT "Solution_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES "Language"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
