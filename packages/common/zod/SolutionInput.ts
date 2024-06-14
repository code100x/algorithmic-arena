import * as z from "zod";

export const SolutionInput = z.object({
  title: z.string(),
  explaination: z.string(),
  code: z.string(),
  problemId: z.string(),
  languageId: z.string(),
});
