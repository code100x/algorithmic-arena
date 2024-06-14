-- CreateTable
CREATE TABLE "ar_internal_metadata" (
    "key" VARCHAR NOT NULL,
    "value" VARCHAR,
    "created_at" TIMESTAMP(6) NOT NULL,
    "updated_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "ar_internal_metadata_pkey" PRIMARY KEY ("key")
);

-- CreateTable
CREATE TABLE "clients" (
    "id" VARCHAR NOT NULL,

    CONSTRAINT "clients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "languages" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR,
    "compile_cmd" VARCHAR,
    "run_cmd" VARCHAR,
    "source_file" VARCHAR,
    "is_archived" BOOLEAN DEFAULT false,

    CONSTRAINT "languages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "schema_migrations" (
    "version" VARCHAR NOT NULL,

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
    "created_at" TIMESTAMP(6),
    "finished_at" TIMESTAMP(6),
    "time" DECIMAL,
    "memory" INTEGER,
    "stderr" TEXT,
    "token" VARCHAR,
    "number_of_runs" INTEGER,
    "cpu_time_limit" DECIMAL,
    "cpu_extra_time" DECIMAL,
    "wall_time_limit" DECIMAL,
    "memory_limit" INTEGER,
    "stack_limit" INTEGER,
    "max_processes_and_or_threads" INTEGER,
    "enable_per_process_and_thread_time_limit" BOOLEAN,
    "enable_per_process_and_thread_memory_limit" BOOLEAN,
    "max_file_size" INTEGER,
    "compile_output" TEXT,
    "exit_code" INTEGER,
    "exit_signal" INTEGER,
    "message" TEXT,
    "wall_time" DECIMAL,
    "compiler_options" VARCHAR,
    "command_line_arguments" VARCHAR,
    "redirect_stderr_to_stdout" BOOLEAN,
    "callback_url" VARCHAR,
    "additional_files" BYTEA,
    "enable_network" BOOLEAN,

    CONSTRAINT "submissions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "index_submissions_on_token" ON "submissions"("token");
