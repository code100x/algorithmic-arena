import React from "react";
import { db } from "../../db";

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
      <div className="mt-6">
        {contests.map((contest) => (
          <div key={contest.id}>{contest.title}</div>
        ))}
      </div>
    </div>
  );
}

export default page;
