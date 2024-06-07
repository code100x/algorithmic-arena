-- CreateEnum
CREATE TYPE "SubmissionStatus" AS ENUM ('ACCEPTED', 'REJECTED', 'RUNTIME_ERROR', 'COMPILATION_ERROR', 'TIME_LIMIT_EXCEEDED', 'MEMORY_LIMIT_EXCEEDED', 'WRONG_ANSWER', 'PENDING');

-- CreateTable
CREATE TABLE "Judge0Submission" (
    "id" TEXT NOT NULL,
    "submissionId" TEXT NOT NULL,
    "status" "SubmissionStatus" NOT NULL,
    "stdout" TEXT,
    "stderr" TEXT,
    "compileOutput" TEXT,
    "time" DOUBLE PRECISION,
    "memory" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Judge0Submission_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Judge0Submission_submissionId_key" ON "Judge0Submission"("submissionId");

-- CreateIndex
CREATE INDEX "Judge0Submission_submissionId_idx" ON "Judge0Submission"("submissionId");

-- AddForeignKey
ALTER TABLE "Judge0Submission" ADD CONSTRAINT "Judge0Submission_submissionId_fkey" FOREIGN KEY ("submissionId") REFERENCES "Submission"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
