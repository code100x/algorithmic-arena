import express, { Request, Response } from "express";
import { PrismaClient } from '@prisma/client';
import { SubmissionCallback } from "@repo/common/zod";
import { handleJudge0Callback } from "./handlers/judge0CallbackHandler";

const prismaClient = new PrismaClient();
const app = express();

app.use(express.json());

app.put("/submission-callback", async (req: Request, res: Response) => {
  const parsedBody = SubmissionCallback.safeParse(req.body);
  if (!parsedBody.success) {
    return res.status(403).json({ message: "Invalid input" });
  }

  try {
    await handleJudge0Callback(parsedBody.data);
    res.send({ message: "Received" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});