import express from "express";
import prismaClient from "./db";
import { outputMapping } from "./outputMapping";
import { getPoints } from "./points";

const app = express();
app.use(express.json());

app.post("/judge0-update", async (req, res) => {
  const { judge0TrackingId, status, time, memory } = req.body;

  const testCase = await prismaClient.testCase.findUnique({
    where: {
      judge0TrackingId,
    },
    include: {
      submission: {
        include: {
          problem: true,
          activeContest: true,
        },
      },
    },
  });

  if (!testCase) {
    return res.status(404).json({
      message: "TestCase not found",
    });
  }

  await prismaClient.testCase.update({
    where: {
      id: testCase.id,
    },
    data: {
      status: outputMapping[status],
      time: Number(time),
      memory: Number(memory),
    },
  });

  const allTestcaseData = await prismaClient.testCase.findMany({
    where: {
      submissionId: testCase.submissionId,
    },
  });

  const pendingTestcases = allTestcaseData.filter(
    (tc) => tc.status === "PENDING"
  );
  const failedTestcases = allTestcaseData.filter(
    (tc) => tc.status !== "AC"
  );

  if (pendingTestcases.length === 0) {
    const accepted = failedTestcases.length === 0;
    const response = await prismaClient.submission.update({
      where: {
        id: testCase.submissionId,
      },
      data: {
        status: accepted ? "AC" : "REJECTED",
        time: Math.max(
          ...allTestcaseData.map((tc) => Number(tc.time || "0"))
        ),
        memory: Math.max(...allTestcaseData.map((tc) => tc.memory || 0)),
      },
      include: {
        problem: true,
        activeContest: true,
      },
    });

    if (response.activeContestId && response.activeContest) {
      const points = await getPoints(
        response.activeContestId,
        response.userId,
        response.problemId,
        response.problem.difficulty,
        response.activeContest.startTime,
        response.activeContest.endTime
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
  }

  res.sendStatus(200);
});

app.listen(process.env.PORT || 3001);