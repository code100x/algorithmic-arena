import { problemStatusIcons } from "@/app/lib/icons";
import { ProblemWithSubmissions } from "@/app/lib/types";
import { capitalize } from "@repo/common/utils";
import DifficultyBadge from "@repo/ui/difficulty-badge";
import { Bookmark, Code2 } from "lucide-react";
import React from "react";

export default function ProblemDescription({
  problem,
}: {
  problem: ProblemWithSubmissions;
}) {
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
          <div className="bg-muted/10 text-muted-foreground py-1 px-3 rounded-full w-fit text-sm h-fit border">
            {`${problem._count.submissions} Submissions`}
          </div>
          <Bookmark className="h-4 w-4" />
        </div>
      </div>
      <div className="">{problem.description}</div>
    </div>
  );
}
