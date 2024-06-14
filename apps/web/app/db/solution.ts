import { db } from ".";

export const getSolutions = async (id: string) => {
  const solutions = await db.solution.findMany({
    where: {
      problemId: id,
    },
    include: {
      user: {
        select: {
          email: true,
        },
      },
      language: {
        select: {
          name: true,
        },
      },
    },
  });
  return solutions;
};

export const getSolution = async (id: string) => {
  const solution = await db.solution.findFirst({
    where: {
      id: id,
    },
    include: {
      user: {
        select: {
          email: true,
        },
      },
      problem: {
        select: {
          title: true,
          defaultCode: true,
        },
      },
    },
  });
  return solution;
};
