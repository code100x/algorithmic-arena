"use client";

import { ColumnDef } from "@tanstack/react-table";
import DifficultyBadge from "@repo/ui/difficulty-badge";
import { Minus } from "lucide-react";
import { capitalize, cn } from "@repo/common/utils";
import { Difficulty, SubmissionResult } from "@prisma/client";
import { problemStatusIcons } from "@/app/lib/icons";

export type ProblemTableType = {
  id: string;
  title: string;
  difficulty: Difficulty;
  points: number;
  status?: SubmissionResult;
  topics: string[];
};

export const columns: ColumnDef<ProblemTableType>[] = [
  {
    accessorKey: "slug",
  },
  {
    accessorKey: "title",
    header: "Name",
    cell: ({ row }) => {
      const title = row.getValue("title") as string;
      return `${capitalize(title)}`;
    },
  },
  {
    accessorKey: "difficulty",
    header: "Difficulty",
    cell: ({ row }) => {
      const difficulty = row.getValue("difficulty") as Difficulty;
      return <DifficultyBadge difficulty={difficulty} />;
    },
    filterFn: (row, id, filterValue) => {
      return filterValue === "ALL" || row.getValue(id) === filterValue;
    },
  },
  {
    accessorKey: "points",
    header: "Points",
    cell: ({ row }) => {
      const points = row.getValue("points") as number;
      return (
        <div className="text-foreground border bg-muted/10 bg-opacity-10 py-1 px-3 rounded-full w-fit text-sm">
          {`${points} pts`}
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as SubmissionResult;
      return (
        problemStatusIcons[status] || (
          <Minus className="h-5 w-5 text-muted-foreground" />
        )
      );
    },
    filterFn: (row, id, filterValue) => {
      return filterValue === "ALL" || row.getValue(id) === filterValue;
    },
  },
  {
    accessorKey: "topics",
    header: "Topics",
    enableHiding: true,
    filterFn: (row, id, filterValue) => {
      const topics = row.getValue(id) as string[];
      return filterValue === "ALL" || topics.includes(filterValue as string);
    },
  },
];
