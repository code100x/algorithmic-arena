import { z } from "zod";

export const SubmissionCallback = z.object({
    stdout: z.string(),
    time: z.string(),
    memory: z.number(),
    stderr: z.string().nullable(),
    token: z.string(),
    compile_output: z.string().nullable(),
    message: z.string().nullable(),
    status: z.object({
        id: z.number(),
        description: z.enum(['Accepted', 'Rejected'])
    })
});