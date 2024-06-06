import express from "express";
import prismaClient from "./db";
import { SubmissionCallback } from "@repo/common/zod";
import { outputMapping } from "./outputMapping";
import { getPoints } from "./points";

const app = express();
app.use(express.json());

app.put("/submission-callback", async (req, res) => {
  const parsedBody = SubmissionCallback.safeParse(req.body);

  if (!parsedBody.success) {
    return res.status(403).json({
      message: "Invalid input",
    });
  }

  const testCase = await prismaClient.testCase.update({
    where: {
      judge0TrackingId: parsedBody.data.token,
    },
    data: {
      status: outputMapping[parsedBody.data.status.description],
      time: Number(parsedBody.data.time),
      memory: parsedBody.data.memory,
    },
  });

  if (!testCase) {
    return res.status(404).json({
      message: "Testcase not found",
    });
  }

  const allTestcaseData = await prismaClient.testCase.findMany({
    where: {
      submissionId: testCase.submissionId,
    },
  });

  const pendingTestcases = allTestcaseData.filter(
    (testcase) => testcase.status === "PENDING",
  );
  const failedTestcases = allTestcaseData.filter(
    (testcase) => testcase.status !== "AC",
  );


  // This logic is fairly ugly
  // We should have another async process update the status of the submission.
  // This can also lead to a race condition where two test case webhooks are sent at the same time
  // None of them would update the status of the submission
  if (pendingTestcases.length === 0) {
    const accepted = failedTestcases.length === 0;
    const response = await prismaClient.submission.update({
      where: {
        id: testCase.submissionId,
      },
      data: {
        status: accepted ? "AC" : "REJECTED",
        time: Math.max(
          ...allTestcaseData.map((testcase) => Number(testcase.time || "0")),
        ),
        memory: Math.max(
          ...allTestcaseData.map((testcase) => testcase.memory || 0),
        ),
      },
      include: {
        problem: true,
        activeContest: true,
      }
    });

    if (response.activeContestId && response.activeContest) {
      const points = await getPoints(
        response.activeContestId,
        response.userId,
        response.problemId,
        response.problem.difficulty,
        response.activeContest?.startTime,
        response.activeContest?.endTime,
      );

      await prismaClient.contestSubmission.upsert({
        where: {
          userId_problemId_contestId: {
            contestId: response.activeContestId,
            userId: response.userId,
            problemId: response.problemId,
          },
        },
        create: {
          submissionId: response.id,
          userId: response.userId,
          problemId: response.problemId,
          contestId: response.activeContestId,
          points,
        },
        update: {
          points,
        },
      });
    }
    // increase the solve count here, or asynchronously later
  }
  res.send("Received");
});

app.listen(process.env.PORT || 3001);
