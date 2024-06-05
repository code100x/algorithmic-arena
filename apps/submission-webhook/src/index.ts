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
            message: "Invalid input"
        })
    }

    const testCase = await prismaClient.testCase.update({
        where: {
            judge0TrackingId: parsedBody.data.token
        },
        data: {
            status: outputMapping[parsedBody.data.status.description],
            time: Number(parsedBody.data.time),
            memory: parsedBody.data.memory,
        }
    });

    if (!testCase) {
        return res.status(404).json({
            message: "Testcase not found"
        })
    }

    const allTestcaseData = await prismaClient.testCase.findMany({
        where: {
            submissionId: testCase.submissionId
        }
    });

    const pendingTestcases = allTestcaseData.filter(testcase => testcase.status === "PENDING");
    const failedTestcases = allTestcaseData.filter(testcase => testcase.status !== "AC");

    if (pendingTestcases.length === 0) {
        const accepted = failedTestcases.length === 0; 
        await prismaClient.$transaction(async (tx) => {
            const response = await tx.submission.update({
                where: {
                    id: testCase.submissionId
                },
                data: {
                    status: accepted ? "REJECTED" : "AC",
                    time: Math.max(...allTestcaseData.map(testcase => Number(testcase.time || "0"))), 
                    memory: Math.max(...allTestcaseData.map(testcase => testcase.memory || 0)),
                }
            });
            if (response.activeContestId) {
                const existingRecord = await tx.contestSubmission.findUnique({
                    where: {
                        userId_problemId_contestId: {
                            contestId: response.activeContestId,
                            userId: response.userId,
                            problemId: response.problemId
                        }
                    }
                });
                
                const points = await getPoints(response.activeContestId, response.userId, response.problemId);
                await tx.contestSubmission.upsert({
                    where: {
                        userId_problemId_contestId: {
                            contestId: response.activeContestId,
                            userId: response.userId,
                            problemId: response.problemId
                        }
                    },
                    create: {
                        submissionId: response.id,
                        userId: response.userId,
                        problemId: response.problemId,
                        contestId: response.activeContestId,
                        points
                    },
                    update: {
                        points
                    },
                })

                if (!existingRecord) {
                    await tx.contestProblem.update({
                        where: {
                            contestId_problemId: {
                                contestId: response.activeContestId,
                                problemId: response.problemId
                            }
                        },
                        data: {
                            solved: {
                                increment: 1
                            }
                        }
                    })
                }
            }
        })

    }
    res.send("Received");
});

app.listen(process.env.PORT || 3001);