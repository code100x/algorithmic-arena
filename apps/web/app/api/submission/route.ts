import { NextRequest, NextResponse } from "next/server";
import { SubmissionInput } from "@repo/common/zod";
import { getProblem } from "../../lib/problems";
import axios from "axios";
import { LANGUAGE_MAPPING } from "@repo/common/language";
import { db } from "../../db";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { rateLimit } from "../../lib/rateLimit";
import { getPoints } from "./points";

const JUDGE0_URI = process.env.JUDGE0_URI || "https://judge.100xdevs.com";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json(
      {
        message: "You must be logged in to submit a problem",
      },
      {
        status: 401,
      }
    );
  }
  const userId = session.user.id;
  //using the ratelimt function from lib, 1 req per 10 seconds
  const isAllowed = await rateLimit(userId, 1, 10); // Limit to 1 requests per 10 seconds

  if (!isAllowed) {
    return NextResponse.json(
      {
        message: "Too many requests. Please wait before submitting again.",
      },
      {
        status: 429,
      }
    );
  }

  const submissionInput = SubmissionInput.safeParse(await req.json());
  if (!submissionInput.success) {
    return NextResponse.json(
      {
        message: "Invalid input",
      },
      {
        status: 400,
      }
    );
  }

  const dbProblem = await db.problem.findUnique({
    where: {
      id: submissionInput.data.problemId,
    },
  });

  if (!dbProblem) {
    return NextResponse.json(
      {
        message: "Problem not found",
      },
      {
        status: 404,
      }
    );
  }

  const problem = await getProblem(
    dbProblem.slug,
    submissionInput.data.languageId
  );
  problem.fullBoilerplateCode = problem.fullBoilerplateCode.replace(
    "##USER_CODE_HERE##",
    submissionInput.data.code
  );

  const response = await axios.post(
    `${JUDGE0_URI}/submissions/batch?base64_encoded=false`,
    {
      submissions: problem.inputs.map((input, index) => ({
        language_id: LANGUAGE_MAPPING[submissionInput.data.languageId]?.judge0,
        source_code: problem.fullBoilerplateCode,
        stdin: input,
        expected_output: problem.outputs[index],
      })),
    }
  );

  const submission = await db.submission.create({
    data: {
      userId: session.user.id,
      problemId: submissionInput.data.problemId,
      code: submissionInput.data.code,
      activeContestId: submissionInput.data.activeContestId,
      testcases: {
        connect: response.data
      }
    },
    include: {
      testcases: true
    }
  });

  return NextResponse.json(
    {
      message: "Submission made",
      id: submission.id,
    },
    {
      status: 200,
    }
  );
}

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json(
      {
        message: "You must be logged in to view submissions",
      },
      {
        status: 401,
      }
    );
  }
  const url = new URL(req.url);
  const searchParams = new URLSearchParams(url.search);
  const submissionId = searchParams.get("id");

  if (!submissionId) {
    return NextResponse.json(
      {
        message: "Invalid submission id",
      },
      {
        status: 400,
      }
    );
  }

  var submission = await db.submission.findUnique({
    where: {
      id: submissionId,
    },
    include: {
      testcases: true
    }
  });

  if (!submission) {
    return NextResponse.json(
      {
        message: "Submission not found",
      },
      {
        status: 404,
      }
    );
  }

  if (!submission.memory || !submission.time) {
    const pendingTestcases = submission.testcases.filter(
      (testcase) => testcase.status_id === 1 || testcase.status_id === 2
    );
    const failedTestcases = submission.testcases.filter(
      (testcase) => testcase.status_id !== 3
    );

    if (pendingTestcases.length === 0) {
      const accepted = failedTestcases.length === 0;
      submission = await db.submission.update({
        where: {
          id: submissionId,
          userId: session.user.id,
        },
        data: {
          status: accepted ? "AC" : "REJECTED",
          time: Math.max(
            ...submission.testcases.map((testcase) => Number(testcase.time || "0"))
          ),
          memory: Math.max(
            ...submission.testcases.map((testcase) => testcase.memory || 0)
          ),
        },
        include: {
          problem: true,
          activeContest: true,
          testcases: true
        },
      });
    }
  }

  if (submission.activeContestId) {
    var contestSubmission = await db.submission.findUnique({
      where: {
        id: submissionId,
      },
      include: {
        activeContest: true,
        problem: true,
      },
    });
    if (
      !contestSubmission ||
      !contestSubmission.activeContestId ||
      !contestSubmission.activeContest?.startTime
    )
      return;

    const points = await getPoints(
      contestSubmission.activeContestId,
      contestSubmission.userId,
      contestSubmission.problemId,
      contestSubmission.problem.difficulty,
      contestSubmission.activeContest?.startTime,
      contestSubmission.activeContest?.endTime
    );

    await db.contestSubmission.upsert({
      where: {
        userId_problemId_contestId: {
          contestId: submission.activeContestId,
          userId: submission.userId,
          problemId: submission.problemId,
        },
      },
      create: {
        submissionId: submission.id,
        userId: submission.userId,
        problemId: submission.problemId,
        contestId: submission.activeContestId,
        points,
      },
      update: {
        points,
      },
    });
  }
  // increase the solve count here, or asynchronously later

  return NextResponse.json(
    {
      submission,
    },
    {
      status: 200,
    }
  );
}
