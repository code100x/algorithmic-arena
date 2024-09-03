import { getSubmission } from "@/actions/submission/getSubmission";
import SubmissionComponent from "@/components/SubmissionComponent";
import React from "react";

export default async function page({
  params: { problemId, submissionId },
}: {
  params: { problemId: string; submissionId: string };
}) {
  const submission = await getSubmission(submissionId);
  if (!submission) return <div className="">Not found</div>;

  return <SubmissionComponent submission={submission} problemId={problemId} />;
}
