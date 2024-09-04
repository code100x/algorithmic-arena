"use client";
import { submissions as SubmissionsType } from "@prisma/client";
import { useState } from "react";

function getTestTextColor(status: number | null) {
  switch (status) {
    case 1:
    case 2:
      return "";
    case 3:
      return "text-green-500";
    default:
      return "text-red-500";
  }
}

export function RenderTestcase({
  testcases,
}: {
  testcases: SubmissionsType[];
}) {
  const [testCase, setTestCase] = useState(0);
  console.log(testcases[0]);
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        {testcases.map((testcase, index) => (
          <div
            key={index}
            className="flex items-center justify-center rounded-md py-2 px-3 bg-primary-foreground cursor-pointer hover:bg-accent"
            onClick={() => {
              setTestCase(index);
            }}
          >
            <div className={getTestTextColor(testcase.status_id)}>
              Case {index + 1}
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <div className="font-medium">Input</div>
          <div className="py-1 px-2 bg-primary-foreground text-muted-foreground rounded-md w-fit min-w-48">
            {testcases[testCase]?.stdin ?? "Error"}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="font-medium">Output</div>
          <div className="py-1 px-2 bg-primary-foreground text-muted-foreground rounded-md w-fit min-w-48">
            {testcases[testCase]?.compile_output ?? "Error"}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="font-medium">Expected Output</div>
          <div className="py-1 px-2 bg-primary-foreground text-muted-foreground rounded-md w-fit min-w-48">
            {testcases[testCase]?.expected_output}
          </div>
        </div>
      </div>
    </div>
  );
}
