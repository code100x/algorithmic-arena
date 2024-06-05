import { getContest } from "../../db/contest";

export async function GET(req: Request) {
    const url = new URL(req.url);
    const searchParams = new URLSearchParams(url.search);
    const contestId = searchParams.get('contestId');
    if (!contestId) {
        return JSON.stringify({ message: "Invalid contest id" });
    }
    const contest = await getContest(contestId);
    return JSON.stringify({ contest });
}