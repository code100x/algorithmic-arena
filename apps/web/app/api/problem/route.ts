import { NextResponse } from "next/server";
import { getProblem } from "../../db/problem";

export async function GET(req: Request) {
    const url = new URL(req.url);
    const searchParams = new URLSearchParams(url.search);
    const problemId = searchParams.get('problemId');

    if (!problemId) {
        return JSON.stringify({ message: "Invalid problem id" });
    }
    const problem = await getProblem(problemId);
    return NextResponse.json({
        problem
    }, {
        status: 200
    });
}