import { problemStatusIcons } from "@/app/lib/icons";
import { ProblemWithSubmissions } from "@/app/lib/types";
import { capitalize } from "@repo/common/utils";
import DifficultyBadge from "@repo/ui/difficulty-badge";
import { DefaultBadge } from "@repo/ui/default-badge";
import { Bookmark, Code2 } from "lucide-react";
import React from "react";
import Markdown from "react-markdown";

export default function ProblemDescription({
  problem,
}: {
  problem: ProblemWithSubmissions;
}) {
  console.log(problem.constraints);
  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex flex-col gap-4 sm:flex-row sm:justify-between w-full">
        <div className="flex gap-2 items-center">
          <Code2 className="h-6 w-6 text-[#4E7AFF]" />
          <div className="text-[32px] font-bold">
            {capitalize(problem.title)}
          </div>
        </div>
        <div className="flex gap-3 items-center">
          {
            problemStatusIcons[
              problem.submissions.length === 0
                ? "PENDING"
                : problem.submissions[0]!.status
            ]
          }
          <DifficultyBadge difficulty={problem.difficulty} />
          <DefaultBadge text={`${problem._count.submissions} Submissions`} />
          <Bookmark className="h-4 w-4" />
        </div>
      </div>
      <div className="font-medium text-muted-foreground">
        {problem.description}
      </div>
      <div className="flex flex-col gap-4">
        {problem.examples.map((e, i) => (
          <div className="flex flex-col gap-2">
            <div key={i} className="font-medium">{`Example ${i + 1}`}</div>
            <div className="flex flex-col gap-1 py-1 px-2 bg-accent rounded-lg">
              <Markdown>{e}</Markdown>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-2">
        <div className="font-medium">Constraints</div>
        <div className="flex flex-col gap-1 py-1 px-2 bg-accent rounded-lg">
          <Markdown>{problem.constraints}</Markdown>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="font-medium">Related Topics</div>
        <div className="flex gap-2">
          {problem.topics.map((t) => (
            <DefaultBadge text={t} />
          ))}
        </div>
      </div>
    </div>
  );
}
