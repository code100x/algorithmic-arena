import { Prisma } from "@prisma/client";
import { db } from "./db";
import { updateContest, updateMemoryAndExecutionTime } from "./utils";
type SubmissionWithTestcases = Prisma.SubmissionGetPayload<{
  include: {
    testcases: true;
  };
}>;

async function updateSubmission(queued_Submission: SubmissionWithTestcases) {
  var isAcceptable = true;

  for (const testcase of queued_Submission?.testcases || []) {
    switch (testcase.status_id) {
      case 1:
      case 2:
        // 1 => Queue, 2 => Processing
        // Revisit later if Processing
        isAcceptable = false;
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
            id: queued_Submission.id,
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
        id: queued_Submission.id,
      },
      data: {
        status: "AC",
      },
    });
  }
}

async function runMainLoop() {
  while (true) {
    try {
      const submissions = await db.submission.findMany({
        orderBy: {
          id: "desc",
        },
        take: 20,
        include: {
          testcases: true,
        },
      });
      for (const submission of submissions || []) {
        await updateSubmission(submission);
      }
    } catch (err) {
      console.error("Error during processing:", err);
    }
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Add a delay of 1 second
  }
}

runMainLoop();
