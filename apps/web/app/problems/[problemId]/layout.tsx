import { getProblem } from "@/actions/problem/getProblem";
import { ProblemComponent } from "@/components/ProblemComponent";
import ProblemPlayground from "@/components/ProblemPlayground";
import React from "react";

export default async function layout({
  children,
  params: { problemId },
}: {
  children: React.ReactNode;
  params: { problemId: string };
}) {
  const problem = await getProblem(problemId);
  if (!problem) {
    return <div>Problem not found</div>;
  }

  return (
    <main className="bg-background text-foreground min-h-[calc(100vh-72px)] pt-6 px-4 pb-6 flex flex-col sm:flex-row gap-6">
      <section className="flex-1">
        <ProblemComponent problem={problem} children={children} />
      </section>
      <section className="flex-1">
        <ProblemPlayground problem={problem} />
      </section>
    </main>
  );
}
