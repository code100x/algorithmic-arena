-- CreateTable
CREATE TABLE "clients" (
    "id" TEXT NOT NULL,

    CONSTRAINT "clients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "languages" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "compile_cmd" TEXT,
    "run_cmd" TEXT,
    "source_file" TEXT,
    "is_archived" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "languages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "schema_migrations" (
    "version" TEXT NOT NULL,

    CONSTRAINT "schema_migrations_pkey" PRIMARY KEY ("version")
);

-- CreateTable
CREATE TABLE "submissions" (
    "id" SERIAL NOT NULL,
    "source_code" TEXT,
    "language_id" INTEGER,
    "stdin" TEXT,
    "expected_output" TEXT,
    "stdout" TEXT,
    "status_id" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL,
    "finished_at" TIMESTAMP(3) NOT NULL,
    "time" DOUBLE PRECISION,
    "memory" INTEGER,
    "stderr" TEXT,
    "token" TEXT,
    "numberOfRuns" INTEGER,
    "cpu_time_limit" DOUBLE PRECISION,
    "cpu_extra_time" DOUBLE PRECISION,
    "wall_time_limit" DOUBLE PRECISION,
    "memory_limit" INTEGER,
    "stack_limit" INTEGER,
    "max_processes_and_or_threads" INTEGER,
    "enable_per_process_and_thread_time_limit" BOOLEAN NOT NULL,
    "enable_per_process_and_thread_memory_limit" BOOLEAN NOT NULL,
    "max_file_size" INTEGER,
    "compile_output" TEXT,
    "exit_code" INTEGER,
    "exit_signal" INTEGER,
    "message" TEXT,
    "wall_time" DOUBLE PRECISION,
    "compiler_options" TEXT,
    "command_line_arguments" TEXT,
    "redirect_stderr_to_stdout" BOOLEAN,
    "callback_url" TEXT,
    "additional_files" BYTEA,
    "enable_network" BOOLEAN,

    CONSTRAINT "submissions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "index_submissions_on_token" ON "submissions"("token");
