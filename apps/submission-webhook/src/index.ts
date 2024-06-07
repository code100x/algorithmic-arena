import express, { Request, Response } from "express";
import { PrismaClient } from '@prisma/client';
import { SubmissionCallback } from "@repo/common/zod";
import { outputMapping } from "./outputMapping";
import { enqueueSubmissionUpdate } from "./messageQueue";

const prismaClient = new PrismaClient();
const app = express();

app.use(express.json());

app.put("/submission-callback", async (req: Request, res: Response) => {
  const parsedBody = SubmissionCallback.safeParse(req.body);
  if (!parsedBody.success) {
    return res.status(403).json({ message: "Invalid input", errors: parsedBody.error.errors });
  }

  try {
    const testCase = await prismaClient.testCase.update({
      where: { judge0TrackingId: parsedBody.data.token },
      data: {
        status: outputMapping[parsedBody.data.status.description] || "UNKNOWN",
        time: Number(parsedBody.data.time),
        memory: parsedBody.data.memory,
      },
    });

    if (!testCase) {
      return res.status(404).json({ message: "Testcase not found" });
    }

    enqueueSubmissionUpdate(Number(testCase.submissionId)).catch(err => {
      console.error("Failed to enqueue submission update:", err);
    });

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
