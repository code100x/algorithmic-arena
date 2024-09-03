import React from "react";
import { getProblem } from "@/actions/problem/getProblem";
import { ProblemSubmitBar } from "@/components/ProblemSubmitBar";
import { ProblemComponent } from "@/components/ProblemComponent";
import ProblemPlayground from "@/components/ProblemPlayground";
import SubmissionsTable from "@/components/submissions-table/page";

export default async function page({
  params: { problemId },
}: {
  params: { problemId: string };
}) {
  return <SubmissionsTable problemId={problemId} />;
}
