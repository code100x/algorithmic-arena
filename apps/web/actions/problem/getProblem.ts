"use server";

import { authOptions } from "@/app/lib/auth";
import { ProblemWithSubmissions } from "@/app/lib/types";
import { Problem } from "@prisma/client";
import db from "@repo/db/client";
import { getServerSession } from "next-auth";

export const getProblem = async (problemId: string, contestId?: string) => {
  const session = await getServerSession(authOptions);
  const userId = !session || !session.user ? "dummy" : session.user.id;

  if (contestId) {
    const contest = await db.contest.findFirst({
      where: {
        id: contestId,
        hidden: false,
      },
    });

    if (!contest) {
      return null;
    }

    const problem = await db.problem.findFirst({
      where: {
        id: problemId,
        contests: {
          some: {
            contestId: contestId,
          },
        },
      },
      include: {
        defaultCode: true,
        submissions: {
          where: {
            userId,
          },
          select: { status: true },
        },
        _count: {
          select: { submissions: true },
        },
      },
    });
    return problem;
  }

  const problem: ProblemWithSubmissions | null = await db.problem.findFirst({
    where: {
      id: problemId,
    },
    include: {
      defaultCode: true,
      submissions: {
        where: {
          userId,
        },
        select: { status: true },
      },
      _count: {
        select: { submissions: true },
      },
    },
  });
  return problem;
};

export const getProblems = async () => {
  const problems: Problem[] = await db.problem.findMany({
    where: {
      hidden: false,
    },
  });
  return problems;
};
