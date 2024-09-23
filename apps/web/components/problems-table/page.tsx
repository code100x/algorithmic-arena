import db from "@repo/db/client";
import { ProblemTableType, columns } from "./columns";
import { DataTable } from "./data-table";
import { authOptions } from "../../app/lib/auth";
import { getServerSession } from "next-auth";
import { Difficulty, SubmissionResult } from "@prisma/client";

function flattenProblems(
  problems: {
    id: string;
    submissions: {
      status: SubmissionResult;
    }[];
    title: string;
    difficulty: Difficulty;
    points: number;
    topics: string[];
  }[]
): ProblemTableType[] {
  return problems.map((p) => {
    const { submissions, ...rest } = p;
    return {
      ...rest,
      status:
        submissions.length === 0
          ? SubmissionResult.PENDING
          : submissions[0]!.status,
    };
  });
}

async function getData(): Promise<ProblemTableType[]> {
  const session = await getServerSession(authOptions);
  const userId = !session || !session.user ? "dummy" : session.user.id;

  try {
    const problems = await db.problem.findMany({
      select: {
        id: true,
        title: true,
        difficulty: true,
        points: true,
        topics: true,
        slug: true,
        submissions: {
          where: {
            userId,
          },
          select: {
            status: true,
          },
        },
      },
    });

    return flattenProblems(problems);
    //return flattenProblems(problems);
  } catch (e) {
    console.error(e);
    return [];
  }
}

export default async function ProblemPage() {
  const data = await getData();

  return (
    <div className="w-full basis-2/3">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
