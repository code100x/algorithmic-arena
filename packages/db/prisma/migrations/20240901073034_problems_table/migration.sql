/*
  Warnings:

  - Added the required column `constraints` to the `Problem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Problem" ADD COLUMN     "constraints" TEXT NOT NULL,
ADD COLUMN     "examples" TEXT[],
ADD COLUMN     "points" INTEGER NOT NULL DEFAULT 100,
ADD COLUMN     "topics" TEXT[];
