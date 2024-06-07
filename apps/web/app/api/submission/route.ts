import { NextRequest, NextResponse } from "next/server";
import { SubmissionInput } from "@repo/common/zod";
import { getProblem } from "../../lib/problems";
import { JUDGE0_URI } from "../../lib/config";
import axios from "axios";
import { LANGUAGE_MAPPING } from "@repo/common/language";
import { db } from "../../db";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { rateLimit } from "../../lib/rateLimit";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json(
      {
        message: "You must be logged in to submit a problem",
      },
      {
        status: 401,
      },
    );
  }
  const userId = session.user.id
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
      },
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
      },
    );
  }

  const problem = await getProblem(
    dbProblem.slug,
    submissionInput.data.languageId,
  );
  problem.fullBoilerplateCode = problem.fullBoilerplateCode.replace(
    "##USER_CODE_HERE##",
    submissionInput.data.code,
  );

  const response = await axios.post(
    `${JUDGE0_URI}/submissions/batch?base64_encoded=false`,
    {
      submissions: problem.inputs.map((input, index) => ({
        language_id: LANGUAGE_MAPPING[submissionInput.data.languageId]?.judge0,
        source_code: problem.fullBoilerplateCode,
        stdin: input,
        expected_output: problem.outputs[index],
        callback_url:
          process.env.JUDGE0_CALLBACK_URL ??
          "https://judge0-callback.100xdevs.com/submission-callback",
      })),
    },
  );

  const submission = await db.submission.create({
    data: {
      userId: session.user.id,
      problemId: submissionInput.data.problemId,
      languageId: LANGUAGE_MAPPING[submissionInput.data.languageId]?.internal!,
      code: submissionInput.data.code,
      fullCode: problem.fullBoilerplateCode,
      status: "PENDING",
      activeContestId: submissionInput.data.activeContestId,
    },
  });

  await db.testCase.createMany({
    data: problem.inputs.map((input, index) => ({
      submissionId: submission.id,
      status: "PENDING",
      index,
      judge0TrackingId: response.data[index].token,
    })),
  });

  return NextResponse.json(
    {
      message: "Submission made",
      id: submission.id,
    },
    {
      status: 200,
    },
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
      },
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
      },
    );
  }

  const submission = await db.submission.findUnique({
    where: {
      id: submissionId,
      userId: session.user.id,
    },
  });

  if (!submission) {
    return NextResponse.json(
      {
        message: "Submission not found",
      },
      {
        status: 404,
      },
    );
  }

  const testCases = await db.testCase.findMany({
    where: {
      submissionId: submissionId,
    },
  });

  return NextResponse.json(
    {
      submission,
      testCases,
    },
    {
      status: 200,
    },
  );
}
