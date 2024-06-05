/*
  Warnings:

  - A unique constraint covering the columns `[userId,problemId,contestId]` on the table `ContestSubmission` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ContestSubmission_userId_problemId_contestId_key" ON "ContestSubmission"("userId", "problemId", "contestId");
