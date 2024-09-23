"use client";
import { capitalize, cn } from "@repo/common/utils";
import { ArrowLeft, Clock4, MemoryStick } from "lucide-react";
import { CopyBlock, dracula } from "react-code-blocks";
import React from "react";
import { SubmissionWithLang } from "@/app/lib/types";
import { DefaultBadge } from "@repo/ui/default-badge";
import { useRouter } from "next/navigation";

const statusClassname = {
  ACCEPTED: "text-green-500",
  PENDING: "",
  REJECTED: "text-red-500",
};

export default function SubmissionComponent({
  submission,
  problemId,
}: {
  submission: SubmissionWithLang;
  problemId: string;
}) {
  const router = useRouter();
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <div className="flex gap-2 py-2 px-3">
          <ArrowLeft
            className="w-4 r-4 cursor-pointer"
            onClick={() => router.push(`/problems/${problemId}`)}
          />
          <div className="font-medium">All Submissions</div>
        </div>
        <div className="flex flex-col gap-0.5">
          <div
            className={cn(statusClassname[submission.status], "font-medium")}
          >
            {capitalize(submission.status)}
          </div>
          <div className="text-xs text-muted-foreground">
            Submitted at {submission.createdAt.toDateString()}
          </div>
          <DefaultBadge text={submission.language.name} />
        </div>
      </div>
      <div className="flex gap-4 w-full ">
        <div className="flex flex-col flex-1 p-3 rounded-md gap-2 bg-accent">
          <div className="flex items-center gap-2">
            <Clock4 className="w-4 h-4" />
            <div className="font-medium">Runtime</div>
          </div>
          <div className="text-xl text-muted-foreground">
            {submission.time ? `${submission.time} ms` : "N/A"}
          </div>
        </div>
        <div className="flex flex-col flex-1 p-3 rounded-md gap-2 bg-accent">
          <div className="flex items-center gap-2">
            <MemoryStick className="w-4 h-4" />
            <div className="font-medium">Memory</div>
          </div>
          <div className="text-xl text-muted-foreground">
            {submission.memory ? `${submission.memory} MB` : "N/A"}
          </div>
        </div>
      </div>
      {submission.code && (
        <CopyBlock
          theme={dracula}
          codeBlock
          text={submission.code}
          language={submission.language.name}
        />
      )}
    </div>
  );
}
