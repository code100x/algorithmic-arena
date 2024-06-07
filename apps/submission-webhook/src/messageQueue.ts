import PrismaClient from './db';
import { getPoints } from './points';


// Function to simulate enqueuing a task
export async function enqueueSubmissionUpdate(submissionId: number): Promise<void> {
    // In a real application, you would enqueue to a message broker like RabbitMQ, Kafka, etc.
    process.nextTick(async () => {
        await handleSubmissionUpdate(submissionId);
    });
}

// Worker function that handles the update, would normally be in a separate service or process
async function handleSubmissionUpdate(submissionId: any): Promise<void> {
    const allTestcaseData = await PrismaClient.testCase.findMany({
        where: { submissionId: submissionId },
    });

    const failedTestcases = allTestcaseData.filter((testcase:any) => testcase.status !== "AC");
    const accepted = failedTestcases.length === 0;

    const response = await PrismaClient.submission.update({
        where: { id: submissionId },
        data: {
            status: accepted ? "AC" : "REJECTED",
            time: Math.max(...allTestcaseData.map((testcase:any) => Number(testcase.time || "0"))),
            memory: Math.max(...allTestcaseData.map((testcase) => testcase.memory || 0)),
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
            response.activeContest?.startTime,
            response.activeContest?.endTime,
        );

        await PrismaClient.contestSubmission.upsert({
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
                points: points,
            },
            update: {
                points: points,
            },
        });
    }
}
