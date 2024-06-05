/*
  Warnings:

  - A unique constraint covering the columns `[judge0TrackingId]` on the table `TestCase` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "TestCase_judge0TrackingId_key" ON "TestCase"("judge0TrackingId");
