import { TrendingUp } from "lucide-react";
import React from "react";
import db from "@repo/db/client";
import DifficultyBadge from "@repo/ui/difficulty-badge";
import { capitalize } from "@repo/common/utils";
import Link from "next/link";

export default async function TrendingProblems() {
  const problems = await db.problem.findMany({
    orderBy: [
      {
        solved: "desc",
      },
    ],
    take: 4,
    select: {
      id: true,
      title: true,
      solved: true,
      difficulty: true,
      slug: true,
      _count: { select: { submissions: true } },
    },
  });

  return (
    <div className="bg-primary-foreground border border-border rounded-xl p-4 basis-1/3 text-foreground flex flex-col h-fit">
      <div className="flex gap-2 items-center">
        <TrendingUp className="h-6 w-6 text-[#FB923C]" />
        <div className="text-xl">Trending Problems</div>
      </div>
      <div className="">
        {problems.map((p) => (
          <Link
            key={p.slug}
            href={`problems/${p.id}`}
            className="flex items-center justify-between py-4"
          >
            <div className="flex flex-col gap-0.5">
              <div className="text-base">{capitalize(p.title)}</div>
              <div className="text-xs text-muted-foreground">{`${p._count.submissions} submissions`}</div>
            </div>
            <DifficultyBadge difficulty={p.difficulty} />
          </Link>
        ))}
      </div>
    </div>
  );
}
