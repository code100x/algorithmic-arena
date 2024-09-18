import React from "react";
import { db } from "../../db";
import Link from "next/link";
import { buttonVariants } from "@repo/ui/button";

async function page() {
  const contests = await db.contest.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return (
    <div className="container md:mt-12 mt-6">
      <h1 className="lg:text-3xl md:text-2xl text-lg font-bold text-muted-foreground">
        On Going Contests
      </h1>
      <div className="mt-6 space-y-4">
        {contests.map((contest) => (
          <div key={contest.id} className="border p-2 rounded-md">
            <h2 className="text-lg font-bold">
              {contest.title}{" "}
              <span className="text-sm text-muted-foreground">
                ({contest.hidden ? "Hidden" : "Visible"})
              </span>
            </h2>
            <p className="text-sm  text-muted-foreground p-2">
              {contest.description}
            </p>
            <div className="mt-2 flex justify-end">
              <Link
                href={`/admin/contests/${contest.id}`}
                className={buttonVariants({ variant: "secondary" })}
              >
                Edit
              </Link>
            </div>
            <div className="text-sm text-muted-foreground flex justify-between mt-3">
              <p>
                Started At: {contest.startTime.toLocaleDateString()}{" "}
                {contest.startTime.toLocaleTimeString()}
              </p>
              <p>
                End At: {contest.endTime.toLocaleDateString()}{" "}
                {contest.endTime.toLocaleTimeString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default page;
