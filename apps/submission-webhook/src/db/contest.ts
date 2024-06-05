import db from './index';
export const getActiveContest = async () => {
    return await db.contest.findFirst({
        where: {

        }