"use server";

import prisma from "@repo/db/client";

export async function getSubmission(submissionId: string) {
  const submission = await prisma.submission.findUnique({
    where: {
      id: submissionId,
    },
    select: {
      id: true,
      status: true,
      memory: true,
      time: true,
      createdAt: true,
      code: true,
      language: { select: { id: true, name: true } },
    },
  });

  return submission;
}
