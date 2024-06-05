import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@repo/ui/card";
import Link from "next/link";
import { parseFutureDate, parseOldDate } from "../app/lib/time";
import { PrimaryButton } from "./LinkButton";

interface ContestCardParams {
  title: string;
  id: string;
  endTime: Date;
  startTime: Date;
}

export function ContestCard({
  title,
  id,
  startTime,
  endTime,
}: ContestCardParams) {
  const duration = `${(new Date(endTime).getTime() - new Date(startTime).getTime()) / (1000 * 60 * 60)} hours`;
  const isActive =
    startTime.getTime() < Date.now() && endTime.getTime() > Date.now();

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between">
          <CardTitle>{title}</CardTitle>
          <div>
            {startTime.getTime() < Date.now() &&
            endTime.getTime() < Date.now() ? (
              <div className="text-red-500">Ended</div>
            ) : null}
            {isActive ? <div className="text-green-500">Active</div> : null}
            {endTime.getTime() < Date.now() ? (
              <div className="text-red-500">Ended</div>
            ) : null}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500 dark:text-gray-400">
              {startTime.getTime() < Date.now() ? "Started" : "Starts in"}
            </p>
            <p>
              {startTime.getTime() < Date.now()
                ? parseOldDate(new Date(startTime))
                : parseFutureDate(new Date(startTime))}
            </p>
          </div>
          <div>
            <p className="text-gray-500 dark:text-gray-400">Duration</p>
            <p>{duration}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <PrimaryButton href={`/contest/${id}`}>
          {isActive ? "Participate" : "View Contest"}
        </PrimaryButton>
      </CardFooter>
    </Card>
  );
}
