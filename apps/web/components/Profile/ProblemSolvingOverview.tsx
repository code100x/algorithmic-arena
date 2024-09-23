"use client";

import React from "react";
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card";
import { ChartConfig, ChartContainer } from "@repo/ui/chart";

interface ChartData {
  category: string;
  solved: number;
  fill: string;
}

const chartData: ChartData[] = [
  { category: "easy", solved: 2, fill: "#3d9c5c" },
  { category: "medium", solved: 3, fill: "#fbbf24" },
  { category: "hard", solved: 3, fill: "#ef4444" },
];

const chartConfig: ChartConfig = {
  solved: {
    label: "Solved",
  },
  problems: {
    label: "Problems",
    color: "hsl(var(--chart-2))",
  },
};

const DifficultySegment: React.FC<{
  difficulty: string;
  value: string;
  fill: string;
}> = ({ difficulty, value, fill }) => {
  return (
    <div className="h-[62px] w-full px-3 py-2 rounded-xl flex flex-col border justify-center items-center gap-0.5">
      <div
        className={`self-stretch text-center text-sm font-medium leading-tight`}
        style={{ color: fill }}
      >
        {difficulty}
      </div>
      <div className="self-stretch text-center text-black dark:text-slate-50 text-base font-medium leading-normal">
        {value}
      </div>
    </div>
  );
};

export function ProblemSolvingOverview() {
  return (
    <Card className="w-[439px] h-[336px] p-4 border">
      <CardHeader className="items-start pb-4">
        <CardTitle className="text-balck dark:text-white text-xl font-bold">
          Problem-Solving Overview
        </CardTitle>
      </CardHeader>
      <CardContent className="flex gap-4 h-full pb-0">
        <div className="flex-shrink-0">
          <ChartContainer
            config={chartConfig}
            className="aspect-square w-40 h-40"
          >
            <RadialBarChart
              data={chartData}
              startAngle={0}
              endAngle={280}
              innerRadius={40}
              outerRadius={80}
            >
              <RadialBar
                dataKey="solved"
                background
                cornerRadius={10}
                // fill={({ payload }: { payload?: { fill?: string } }) => payload?.fill || "#ccc"}
              />
              <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                {/* <Label
                  content={({
                    viewBox,
                  }: {
                    viewBox?: { cx?: number; cy?: number };
                  }) => {
                    if (
                      viewBox &&
                      viewBox.cx !== undefined &&
                      viewBox.cy !== undefined
                    ) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-foreground text-4xl font-bold"
                          >
                            {chartData[0].solved.toLocaleString()}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground"
                          >
                            Solved
                          </tspan>
                        </text>
                      );
                    }
                    return null;
                  }}
                /> */}
              </PolarRadiusAxis>
            </RadialBarChart>
          </ChartContainer>
        </div>
        <div className="flex flex-col gap-2 flex-grow">
          {chartData.map(({ category, solved, fill }) => (
            <DifficultySegment
              key={category}
              difficulty={category.charAt(0).toUpperCase() + category.slice(1)}
              value={`${solved} / 25`}
              fill={fill}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
