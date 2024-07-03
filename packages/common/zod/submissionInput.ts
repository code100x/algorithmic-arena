import { z } from "zod";

export const SubmissionInput = z.object({
  code: z.string(),
  languageId: z.enum(["js", "cpp", "rs","java"]),
  problemId: z.string(),
  activeContestId: z.string().optional(),
  token: z.string(),
});
