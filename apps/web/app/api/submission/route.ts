import { NextRequest, NextResponse } from "next/server";
import { SubmissionInput } from "@repo/common/zod";
import { getProblem } from "../../lib/problems";
import axios from "axios";
import { LANGUAGE_MAPPING } from "@repo/common/language";
import { db } from "../../db";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { rateLimit } from "../../lib/rateLimit";

const JUDGE0_URI = process.env.JUDGE0_URI || "https://judge.100xdevs.com";

const SECRET_KEY = process.env.CLOUDFLARE_TURNSTILE_SECRET_KEY!;
const CLOUDFLARE_TURNSTILE_URL =
  "https://challenges.cloudflare.com/turnstile/v0/siteverify";

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

  let formData = new FormData();
  formData.append("secret", SECRET_KEY);
  formData.append("response", submissionInput.data.token);

  const result = await fetch(CLOUDFLARE_TURNSTILE_URL, {
    body: formData,
    method: "POST",
  });
  const challengeResult = await result.json();
  const challengeSucceeded = (challengeResult).success;

  if (!challengeSucceeded && process.env.NODE_ENV === "production") {
    return NextResponse.json(
      {
        message: "Invalid reCAPTCHA token",
      },
      {
        status: 403,
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
        source_code: problem.fullBoilerplateCode.replace(
          "##INPUT_FILE_INDEX##",
          index.toString()
        ),
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
        connect: response.data,
      },
    },
    include: {
      testcases: true,
    },
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
      testcases: true,
    },
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
