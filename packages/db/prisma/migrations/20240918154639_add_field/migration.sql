/*
  Warnings:

  - The primary key for the `ContestProblem` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[contestId,problemId]` on the table `ContestProblem` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "ContestProblem" DROP CONSTRAINT "ContestProblem_pkey",
ADD CONSTRAINT "ContestProblem_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "ContestProblem_contestId_problemId_key" ON "ContestProblem"("contestId", "problemId");
