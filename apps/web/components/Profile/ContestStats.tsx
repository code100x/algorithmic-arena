"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card";

interface ContestStat {
  title: string;
  value: string;
  highlight?: string;
}

const contestStatsData: ContestStat[] = [
  { title: "Overall Contest Ranking", value: "Your Current Rank: #15" },
  { title: "Contests Participated", value: "Total Contests Participated: 12" },
  {
    title: "Best Rank Achieved",
    value: "Highest Rank: #15 in",
    highlight: "Weekly Contest 1",
  },
];

const ContestStatItem: React.FC<{
  title: string;
  value: string;
  highlight?: string;
}> = ({ title, value, highlight }) => (
  <div className="self-stretch h-[76px] px-4 py-3 rounded-xl flex-col justify-start items-start gap-2 flex">
    <div className="self-stretch dark:text-slate-50 text-black text-base font-medium leading-normal">
      {title}
    </div>
    <div className="self-stretch text-slate-400 text-sm font-medium leading-tight">
      {value}
      {highlight && <span className="text-[#4e7aff]"> {highlight}</span>}
    </div>
  </div>
);

export function ContestStats() {
  return (
    <Card className="w-[439.5px] h-[336px] gap-4 font-bold border">
      <CardHeader className="items-start px-6 pt-6">
        <CardTitle className="dark:text-slate-50 text-black  text-xl font-bold">
          Your Contest Stats
        </CardTitle>
      </CardHeader>
      <CardContent className="w-[417.5px] h-[76px] pl-6 gap-2 rounded-md flex flex-col">
        {contestStatsData.map((stat, index) => (
          <ContestStatItem
            key={index}
            title={stat.title}
            value={stat.value}
            highlight={stat.highlight}
          />
        ))}
      </CardContent>
    </Card>
  );
}
