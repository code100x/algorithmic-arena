import express from "express";
import { PrismaClient } from "@prisma/client";
import { outputMapping } from "./outputMapping";
import { getPoints } from "./points";

const prisma = new PrismaClient();
const app = express();
app.use(express.json());

app.post("/judge0-update", async (req, res) => {
  try {
    const { judge0TrackingId, status, time, memory, submissionId } = req.body;


    await prisma.testCase.updateMany({
      where: {
        judge0TrackingId,
        submissionId,
      },
      data: {
        status: outputMapping[status], 
        time: Number(time),
        memory: Number(memory),
      },
    });

  
    const allTestCases = await prisma.testCase.findMany({
      where: {
        submissionId,
      },
    });

    const pendingTestCases = allTestCases.filter(tc => tc.status === "PENDING");
    const failedTestCases = allTestCases.filter(tc => tc.status !== "AC");

    if (pendingTestCases.length === 0) {

      const accepted = failedTestCases.length === 0;
      await prisma.submission.update({
        where: {
          id: submissionId,
        },
        data: {
          status: accepted ? "AC" : "REJECTED",
          time: Math.max(...allTestCases.map(tc => Number(tc.time || "0"))),
          memory: Math.max(...allTestCases.map(tc => tc.memory || 0)),
        },
        include: {
          problem: true,
          activeContest: true,
        }
      });


      const submission = await prisma.submission.findUnique({
        where: {
          id: submissionId,
        },
      });

      if (submission && submission.activeContestId && submission.activeContestId) {
        const points = getPoints(
          submission.id,
          submission.userId,
          submission.problemId,
          submission.activeContestId,
          new Date(submission.time || new Date()),
          new Date(submission.memory || new Date())
        ); 
        await prisma.contestSubmission.upsert({
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
            points: await getPoints(
              submission.id,
              submission.userId,
              submission.problemId,
              submission.activeContestId,
              new Date(submission.time || new Date()),
              new Date(submission.memory || new Date()),
            ),
          },
          update: {
            points: await getPoints(
              submission.id,
              submission.userId,
              submission.problemId,
              submission.activeContestId,
              new Date(submission.time || new Date()),
              new Date(submission.memory || new Date())
            ),
          },
        });
      }
    }

    res.sendStatus(200);
  } catch (error) {
    console.error("Error handling judge0 update:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(process.env.PORT || 3001, () => {
  console.log(`Server is running on port ${process.env.PORT || 3001}`);
});
