/*
  Warnings:

  - A unique constraint covering the columns `[token]` on the table `submissions` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "submissions_token_key" ON "submissions"("token");
