import { TestCaseResult } from "@prisma/client";

export const outputMapping: Record<string, TestCaseResult> = {
    "Accepted": "AC",
    "Wrong Answer": TestCaseResult.FAIL,
    "Time Limit Exceeded": TestCaseResult.TLE,
    "Memory Limit Exceeded": TestCaseResult.COMPILATION_ERROR,
    "Compilation Error": TestCaseResult.COMPILATION_ERROR,
}