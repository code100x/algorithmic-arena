import React from "react";
import { getProblem } from "@/actions/problem/getProblem";
import { ProblemStatement } from "@/components/ProblemStatement";
import { ProblemSubmitBar } from "@/components/ProblemSubmitBar";
import { ProblemComponent } from "@/components/ProblemComponent";

export default async function page({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const problem = await getProblem(slug);
  if (!problem) {
    return <div>Problem not found</div>;
  }
  return (
    <main className="bg-background text-foreground sm:pb-14 h-auto pt-6 px-4 pb-12 flex flex-col sm:flex-row gap-6">
      <section className="flex-1">
        <ProblemComponent problem={problem} />
      </section>
      <section className="flex-1">
        {/* <ProblemSubmitBar problem={problem} /> */}
      </section>
    </main>
  );
}
