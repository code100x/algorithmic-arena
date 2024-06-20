"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@repo/ui/card";
import { PrimaryButton } from "./LinkButton";
import { z } from "zod";
import { problemSchema } from "@repo/common/zod";
import { useSearchParams } from "next/navigation";

type Problem = z.infer<typeof problemSchema>;

export function ProblemCard({ problem }: { problem: Problem }) {
  const searchParams = useSearchParams();
  const level = searchParams.get("level");

  const shouldDisplay = !level || problem.difficulty === level.toUpperCase();

  return (
    <div style={{ display: shouldDisplay ? 'block' : 'none' }}>
      <Card>
        <CardHeader>
          <CardTitle>{problem.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 dark:text-gray-400">Difficulty</p>
              <p>{problem.difficulty}</p>
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-400">Submissions</p>
              <p>{problem.solved}</p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <PrimaryButton href={`/problem/${problem.id}`}>
            View Problem
          </PrimaryButton>
        </CardFooter>
      </Card>
    </div>
  );
}

