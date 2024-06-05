/*
  Warnings:

  - You are about to drop the column `totalPoints` on the `ContestPoints` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[contestId,userId]` on the table `ContestPoints` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `points` to the `ContestPoints` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ContestPoints" DROP COLUMN "totalPoints",
ADD COLUMN     "points" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "ContestPoints_contestId_userId_key" ON "ContestPoints"("contestId", "userId");
