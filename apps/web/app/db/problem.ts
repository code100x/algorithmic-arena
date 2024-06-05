import { db } from ".";

export const getProblem = async (problemId: string) => {
    const problem = await db.problem.findFirst({
        where: {
            id: problemId,
        },
        include: {
            defaultCode: true,
        }
    });
    return problem;
}

export const getProblems = async () => {
    const problems = await db.problem.findMany({
        where: {
            hidden: false,
        },
        include: {
            defaultCode: true,
        }
    });
    return problems;
}