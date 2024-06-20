import { z } from "zod";

const problemCodeSchema = z.object({
  id: z.string(),
  languageId: z.number(),
  problemId: z.string(),
  code: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const problemSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  hidden: z.boolean(),
  slug: z.string(),
  solved: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
  difficulty: z.enum(["EASY", "MEDIUM", "HARD"]),
  defaultCode: z.array(problemCodeSchema)
});
