import React from "react";
import { db } from "../../../db";
import CreateContestForm from "../../../../components/CreateContestForm";

const page = async ({ params }: { params: { id: string } }) => {
  const contest = await db.contest.findUnique({
    where: {
      id: params.id,
    },
    include: {
      problems: true,
    },
  });
  const problems = await db.problem.findMany();
  if (!contest) {
    return <h1 className="container md:mt-12 mt-6">Not Found</h1>;
  }
  return (
    <div className="container md:mt-12 mt-6">
      <h1 className="lg:text-2xl md:text-xl text-lg font-bold text-muted-foreground">
        {contest.title}
      </h1>

      <div className="mt-12">
        <CreateContestForm
          intitalContest={contest}
          intitalProblems={problems}
        />
      </div>
    </div>
  );
};

export default page;
