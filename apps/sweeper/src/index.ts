import { Prisma } from "@prisma/client";
import { db } from "./db";
import { createClient } from "redis";
import { getPoints } from "./points";

const redis = createClient();

type SubmissionWithTestcases = Prisma.SubmissionGetPayload<{
  include: {
    testcases: true;
  };
}>;

async function main() {
  const queued_Submission_id = await redis.lPop("submission_queue");
  if (!queued_Submission_id) return; // Add some delay logic if needed

  const queued_Submission = await db.submission.findFirst({
    where: {
      id: queued_Submission_id,
    },
    include: {
      testcases: true,
    },
  });

  var isAcceptable = true;

  for (const testcase of queued_Submission?.testcases || []) {
    switch (testcase.status_id) {
      case 1:
      case 2:
        // 1 => Queue, 2 => Processing
        // Revisit later if Processing
        isAcceptable = false;
        await redis.rPush("submission_queue", queued_Submission_id);
        break;
      case 3:
        // 3 => Accepted
        // Check Next
        break;
      default:
        // ...Others => Errors and UnAccepted
        // Can break the flow immediately
        isAcceptable = false;
        await db.submission.update({
          where: {
            id: queued_Submission_id,
          },
          data: {
            status: "REJECTED",
          },
        });
        return; // Exit early since the flow is broken
    }

    if (!isAcceptable) {
      break;
    }
  }

  if (isAcceptable && queued_Submission?.testcases) {
    updateMemoryAndExecutionTime(queued_Submission);
    if (queued_Submission?.activeContestId) {
      updateContest(queued_Submission);
    }
    await db.submission.update({
      where: {
        id: queued_Submission_id,
      },
      data: {
        status: "AC",
      },
    });
  }
}

async function runMainLoop() {
  await redis.connect().then(() => {
    console.log("Redis Connected!");
  });
  redis.on("close", () => {
    console.log("Redis Disconnected!");
  });
  while (true) {
    if (!redis.isOpen) {
      return;
    }
    try {
      await main();
    } catch (err) {
      console.error("Error during processing:", err);
    }
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Add a delay of 1 second
  }
}

runMainLoop();

async function updateMemoryAndExecutionTime(
  submission: SubmissionWithTestcases
) {
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
        id: submission.id,
      },
      data: {
        status: accepted ? "AC" : "REJECTED",
        time: Math.max(
          ...submission.testcases.map((testcase) =>
            Number(testcase.time || "0")
          )
        ),
        memory: Math.max(
          ...submission.testcases.map((testcase) => testcase.memory || 0)
        ),
      },
      include: {
        problem: true,
        activeContest: true,
        testcases: true,
      },
    });
  }
}

async function updateContest(submission: SubmissionWithTestcases) {
  var contestSubmission = await db.submission.findUnique({
    where: {
      id: submission.id,
    },
    include: {
      activeContest: true,
      problem: true,
    },
  });
  if (
    !contestSubmission ||
    !contestSubmission.activeContestId ||
    !contestSubmission.activeContest?.startTime ||
    !submission.activeContestId
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
