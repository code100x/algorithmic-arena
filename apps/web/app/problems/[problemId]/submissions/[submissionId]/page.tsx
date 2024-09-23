import { getSubmission } from "@/actions/submission/getSubmission";
import SubmissionComponent from "@/components/SubmissionComponent";
import { getServerSession } from "next-auth";
import React from "react";

export default async function page({
  params: { problemId, submissionId },
}: {
  params: { problemId: string; submissionId: string };
}) {
  const session = await getServerSession();
  if (!session || !session.user) return <div className="">Please login</div>;

  const submission = await getSubmission(submissionId);
  if (!submission) return <div className="">Not found</div>;

  return <SubmissionComponent submission={submission} problemId={problemId} />;
}
