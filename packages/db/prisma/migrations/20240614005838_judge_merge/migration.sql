/*
  Warnings:

  - You are about to drop the column `fullCode` on the `Submission` table. All the data in the column will be lost.
  - You are about to drop the column `languageId` on the `Submission` table. All the data in the column will be lost.
  - The primary key for the `ar_internal_metadata` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `clients` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `schema_migrations` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `numberOfRuns` on the `submissions` table. All the data in the column will be lost.
  - You are about to alter the column `time` on the `submissions` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal`.
  - You are about to alter the column `cpu_time_limit` on the `submissions` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal`.
  - You are about to alter the column `cpu_extra_time` on the `submissions` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal`.
  - You are about to alter the column `wall_time_limit` on the `submissions` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal`.
  - You are about to alter the column `wall_time` on the `submissions` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal`.
  - You are about to drop the `TestCase` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[token]` on the table `submissions` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Submission" DROP CONSTRAINT "Submission_languageId_fkey";

-- DropForeignKey
ALTER TABLE "TestCase" DROP CONSTRAINT "TestCase_submissionId_fkey";

-- AlterTable
ALTER TABLE "Submission" DROP COLUMN "fullCode",
DROP COLUMN "languageId",
ALTER COLUMN "updatedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "ar_internal_metadata" DROP CONSTRAINT "ar_internal_metadata_pkey",
ALTER COLUMN "key" SET DATA TYPE VARCHAR,
ALTER COLUMN "value" SET DATA TYPE VARCHAR,
ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMP(6),
ALTER COLUMN "updated_at" SET DATA TYPE TIMESTAMP(6),
ADD CONSTRAINT "ar_internal_metadata_pkey" PRIMARY KEY ("key");

-- AlterTable
ALTER TABLE "clients" DROP CONSTRAINT "clients_pkey",
ALTER COLUMN "id" SET DATA TYPE VARCHAR,
ADD CONSTRAINT "clients_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "languages" ALTER COLUMN "name" SET DATA TYPE VARCHAR,
ALTER COLUMN "compile_cmd" SET DATA TYPE VARCHAR,
ALTER COLUMN "run_cmd" SET DATA TYPE VARCHAR,
ALTER COLUMN "source_file" SET DATA TYPE VARCHAR,
ALTER COLUMN "is_archived" DROP NOT NULL;

-- AlterTable
ALTER TABLE "schema_migrations" DROP CONSTRAINT "schema_migrations_pkey",
ALTER COLUMN "version" SET DATA TYPE VARCHAR,
ADD CONSTRAINT "schema_migrations_pkey" PRIMARY KEY ("version");

-- AlterTable
ALTER TABLE "submissions" DROP COLUMN "numberOfRuns",
ADD COLUMN     "number_of_runs" INTEGER,
ADD COLUMN     "submissionId" TEXT,
ALTER COLUMN "created_at" DROP NOT NULL,
ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMP(6),
ALTER COLUMN "finished_at" DROP NOT NULL,
ALTER COLUMN "finished_at" SET DATA TYPE TIMESTAMP(6),
ALTER COLUMN "time" SET DATA TYPE DECIMAL,
ALTER COLUMN "token" SET DATA TYPE VARCHAR,
ALTER COLUMN "cpu_time_limit" SET DATA TYPE DECIMAL,
ALTER COLUMN "cpu_extra_time" SET DATA TYPE DECIMAL,
ALTER COLUMN "wall_time_limit" SET DATA TYPE DECIMAL,
ALTER COLUMN "enable_per_process_and_thread_time_limit" DROP NOT NULL,
ALTER COLUMN "enable_per_process_and_thread_memory_limit" DROP NOT NULL,
ALTER COLUMN "wall_time" SET DATA TYPE DECIMAL,
ALTER COLUMN "compiler_options" SET DATA TYPE VARCHAR,
ALTER COLUMN "command_line_arguments" SET DATA TYPE VARCHAR,
ALTER COLUMN "callback_url" SET DATA TYPE VARCHAR;

-- DropTable
DROP TABLE "TestCase";

-- DropEnum
DROP TYPE "TestCaseResult";

-- CreateIndex
CREATE UNIQUE INDEX "submissions_token_key" ON "submissions"("token");

-- AddForeignKey
ALTER TABLE "submissions" ADD CONSTRAINT "submissions_submissionId_fkey" FOREIGN KEY ("submissionId") REFERENCES "Submission"("id") ON DELETE SET NULL ON UPDATE CASCADE;
