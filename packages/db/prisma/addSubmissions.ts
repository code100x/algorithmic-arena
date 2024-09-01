import { Submission, SubmissionResult, submissions } from "@prisma/client";
import prisma from "../src";

const getProblems = async () => {
  const problems = await prisma.problem.findMany({
    select: {
      id: true,
    },
  });
  return problems;
};

export async function addSubmissions() {
  const problems = await getProblems();

  const submissions = [
    {
      id: "1",
      problemId: problems[0].id,
      userId: "1",
      code: "",
    },
    {
      id: "2",
      problemId: problems[1].id,
      userId: "1",
      code: "",
      status: SubmissionResult.AC,
    },
    {
      id: "3",
      problemId: problems[2].id,
      userId: "1",
      code: "",
      status: SubmissionResult.REJECTED,
    },
  ];

  submissions.map(async (s) => {
    const sub = await prisma.submission.upsert({
      where: {
        id: s.id,
      },
      create: {
        id: s.id,
        problemId: s.problemId,
        userId: s.userId,
        code: s.code,
        status: s.status || SubmissionResult.PENDING,
      },
      update: {
        problemId: s.problemId,
        userId: s.userId,
        code: s.code,
        status: s.status || SubmissionResult.PENDING,
      },
    });
  });
}
