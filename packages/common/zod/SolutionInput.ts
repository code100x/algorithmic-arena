import * as z from "zod";

export const SolutionInput = z.object({
  title: z.string().min(1, "Please enter the title"),
  explaination: z.string(),
  code: z.string(),
  problemId: z.string(),
  languageId: z.string(),
});
