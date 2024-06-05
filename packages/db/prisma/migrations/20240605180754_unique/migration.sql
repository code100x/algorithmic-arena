/*
  Warnings:

  - A unique constraint covering the columns `[problemId,languageId]` on the table `DefaultCode` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "DefaultCode_problemId_languageId_key" ON "DefaultCode"("problemId", "languageId");
