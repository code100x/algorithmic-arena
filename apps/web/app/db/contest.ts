import { db } from ".";

export const getContest = async (contestId: string) => {
    const contest = await db.contest.findFirst({
        where: {
            id: contestId,
            hidden: false,
        },
        include: {
            problems: {
                include: {
                    problem: true
                }
            } 
        }
    });
    return contest;
}

export const getUpcomingContests = async () => {
    const contests = await db.contest.findMany({
        where: {
            hidden: false,
            endTime: {
                gt: new Date()
            }
        },
        orderBy: {
            startTime: "asc"
        }
    });
    return contests;
}

export const getExistingContests = async () => {
    const contests = await db.contest.findMany({
        where: {
            hidden: false,
            endTime: {
                lt: new Date()
            }
        },
        orderBy: {
            startTime: "asc"
        }
    });
    return contests;
}