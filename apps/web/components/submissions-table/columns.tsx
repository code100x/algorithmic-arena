"use client";

import { SubmissionResult } from "@prisma/client";
import { capitalize, cn } from "@repo/common/utils";
import { DefaultBadge } from "@repo/ui/default-badge";
import { ColumnDef } from "@tanstack/react-table";

export type SubmissionsTableType = {
  status: SubmissionResult;
  language: string;
  time: number | null;
  memory: number | null;
  createdAt: string;
};

const statusClassname = {
  ACCEPTED: "text-green-500",
  PENDING: "",
  REJECTED: "text-red-500",
};

export const columns: ColumnDef<SubmissionsTableType>[] = [
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as
        | "ACCEPTED"
        | "PENDING"
        | "REJECTED";
      return (
        <div className="flex gap-2 items-center">
          <div className={cn(statusClassname[status], "font-medium text-base")}>
            {capitalize(status)}
          </div>
          <div className="text-muted-foreground text-sm">
            Submitted at {row.getValue("createdAt") as string}
          </div>
        </div>
      );
    },
    filterFn: (row, id, filterValue) => {
      return filterValue === "ALL" || row.getValue(id) === filterValue;
    },
  },
  {
    accessorKey: "language",
    header: "Language",
    cell: ({ row }) => {
      const lang = row.getValue("language") as string;
      return <DefaultBadge text={lang} />;
    },
    filterFn: (row, id, filterValue) => {
      return filterValue === "ALL" || row.getValue(id) === filterValue;
    },
  },
  {
    accessorKey: "time",
    header: "Runtime",
    cell: ({ row }) => {
      const runtime = row.getValue("time") as string;
      return <div className="text-muted-foreground">{runtime || "N/A"}</div>;
    },
  },
  {
    accessorKey: "memory",
    header: "Memory",
    cell: ({ row }) => {
      const memory = row.getValue("memory") as string;
      return <div className="text-muted-foreground">{memory || "N/A"}</div>;
    },
  },
  {
    accessorKey: "createdAt",
  },
];
