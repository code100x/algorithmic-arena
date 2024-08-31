-- AlterTable
ALTER TABLE "Problem" ADD COLUMN     "points" INTEGER NOT NULL DEFAULT 100,
ADD COLUMN     "topics" TEXT[];
