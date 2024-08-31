import { Prisma } from "@prisma/client";

const ProblemWithSubmissions = Prisma.validator<Prisma.ProblemDefaultArgs>()({
  include: {
    submissions: {
      select: { status: true },
    },
    _count: {
      select: { submissions: true },
    },
  },
});

export type ProblemWithSubmissions = Prisma.ProblemGetPayload<
  typeof ProblemWithSubmissions
>;
