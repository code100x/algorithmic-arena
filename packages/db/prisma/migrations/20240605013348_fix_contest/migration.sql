/*
  Warnings:

  - You are about to drop the column `rank` on the `ContestSubmission` table. All the data in the column will be lost.
  - Added the required column `rank` to the `ContestPoints` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ContestPoints" ADD COLUMN     "rank" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "ContestSubmission" DROP COLUMN "rank";
