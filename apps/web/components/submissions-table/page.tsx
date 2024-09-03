import prisma from "@repo/db/client";
import React from "react";
import { DataTable } from "./data-table";
import { columns, SubmissionsTableType } from "./columns";
import { SubmissionWithLang } from "@/app/lib/types";

const flattenSubmissions = (
  submissions: SubmissionWithLang[]
): SubmissionsTableType[] => {
  return submissions.map((s) => {
    const { language, createdAt, ...rest } = s;
    return {
      ...rest,
      language: language.name,
      createdAt: createdAt.toDateString(),
    };
  });
};

async function getData(problemId: string) {
  const submissions: SubmissionWithLang[] = await prisma.submission.findMany({
    where: {
      problemId,
    },
    select: {
      id: true,
      status: true,
      memory: true,
      time: true,
      createdAt: true,
      code: true,
      language: { select: { id: true, name: true } },
    },
  });

  return flattenSubmissions(submissions);
}

export default async function SubmissionsTable({
  problemId,
}: {
  problemId: string;
}) {
  const data = await getData(problemId);

  return (
    <div className="flex flex-col gap-6 w-full">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
